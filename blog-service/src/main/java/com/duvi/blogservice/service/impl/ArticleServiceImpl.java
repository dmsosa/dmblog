package com.duvi.blogservice.service.impl;


import com.duvi.blogservice.model.Article;
import com.duvi.blogservice.model.Tag;
import com.duvi.blogservice.model.User;
import com.duvi.blogservice.model.dto.ArticleResponseDTO;
import com.duvi.blogservice.model.dto.SetArticleDTO;
import com.duvi.blogservice.model.dto.UserResponseDTO;
import com.duvi.blogservice.model.exceptions.EntityAlreadyExistsException;
import com.duvi.blogservice.model.exceptions.EntityDoesNotExistsException;
import com.duvi.blogservice.model.exceptions.TagNotFoundException;
import com.duvi.blogservice.model.relations.ArticleTag;
import com.duvi.blogservice.model.relations.ArticleTagId;
import com.duvi.blogservice.model.relations.ArticleUser;
import com.duvi.blogservice.model.relations.ArticleUserId;
import com.duvi.blogservice.repository.ArticleRepository;
import com.duvi.blogservice.repository.CommentRepository;
import com.duvi.blogservice.repository.TagRepository;
import com.duvi.blogservice.repository.UserRepository;
import com.duvi.blogservice.repository.relations.ArticleTagRepository;
import com.duvi.blogservice.repository.relations.ArticleUserRepository;
import com.duvi.blogservice.service.AmazonS3Service;
import com.duvi.blogservice.service.ArticleService;
import com.duvi.blogservice.service.CommentService;
import com.duvi.blogservice.service.UserService;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;

@Service
public class ArticleServiceImpl implements ArticleService {

    private ArticleRepository articleRepository;
    private UserRepository userRepository;
    private ArticleUserRepository favsRepository;
    private ArticleTagRepository catsRepository;
    private TagRepository tagRepository;
    private UserService userService;
    private AmazonS3Service awsService;

    public ArticleServiceImpl(ArticleRepository articleRepository,
                              UserRepository userRepository,
                              ArticleUserRepository favsRepository,
                              ArticleTagRepository catsRepository,
                              TagRepository tagRepository,
                              CommentRepository commentRepository,
                              UserService userService,
                              CommentService commentService) {
        this.articleRepository = articleRepository;
        this.userRepository = userRepository;
        this.favsRepository = favsRepository;
        this.catsRepository = catsRepository;
        this.tagRepository = tagRepository;
        this.userService = userService;
    }

    //CreateDTO
    @Override
    public ArticleResponseDTO createDTO(Article article) {

        List<String> tagList = article.getTagList();

        Integer favsCount = 0;
        Boolean isFav = false;
        UserResponseDTO author;

        if (article.getFavUsers() != null) {
            favsCount = article.getFavUsers().size();
        }
        try {
            author = userService.findUserById(article.getAuthor().getId());
        } catch (EntityDoesNotExistsException unfe) {
            author = null;
        }

        return new ArticleResponseDTO(
                article.getId(),
                author,
                article.getTitle(),
                article.getBody(),
                article.getDescription(),
                article.getSlug(),
                article.getFontColor(),
                article.getBackgroundColor(),
                article.getEmoji(),
                tagList,
                article.getCreatedAt(),
                article.getUpdatedAt(),
                favsCount,
                isFav
        );
    }

    public Boolean checkFav(Long articleId, String loggedUsername) {
        User user = userRepository.findByUsername(loggedUsername).get();
        List<ArticleUser> favArticles = favsRepository.findByUserId(user.getId());
        return !favArticles.stream().filter(
                rel -> Objects.equals(rel.getArticle().getId(), articleId))
                .toList()
                .isEmpty();
    }
    //Basic CRUD Operations
    @Override
    public List<ArticleResponseDTO> getArticlesSorted(){
        List<Article> articleList = articleRepository.findAll(Sort.by(Sort.Direction.DESC, "updatedAt"));
        return articleList.stream().map(article -> createDTO(article)).toList();
    }
    @Override
    public List<ArticleResponseDTO> getArticles()  {
        List<Article> articleList = articleRepository.findAll();
        return articleList.stream().map(article -> createDTO(article)).toList();
    }
    @Override
    public ArticleResponseDTO createArticle(SetArticleDTO articleDTO) throws EntityAlreadyExistsException, EntityDoesNotExistsException {
        if (!articleRepository.existsByTitle(articleDTO.title())) {
            //set author
            User user = userRepository.findById(articleDTO.userId()).get();
            Article article = new Article(articleDTO, user);
            articleRepository.save(article);
            //set tags
            for (String tag : articleDTO.tagList()) {
                this.setTag(articleDTO.slug(), tag);
            }
            return createDTO(articleRepository.findBySlug(articleDTO.slug()).get());
        }
        throw new EntityAlreadyExistsException(articleDTO.title());
    }

    @Override
    public ArticleResponseDTO getArticleBySlug(String articleSlug) throws EntityDoesNotExistsException {
        Optional<Article> optArticle = articleRepository.findBySlug(articleSlug);
        if (optArticle.isEmpty()) {
            throw new EntityDoesNotExistsException("Article with slug '%s' do not exists!".formatted(articleSlug));
        }
        Article article = optArticle.get();
        return createDTO(article);
    }
    @Override
    public ArticleResponseDTO getArticleById(Long id) throws EntityDoesNotExistsException {
        Optional<Article> optionalArticle = articleRepository.findById(id);
        if (optionalArticle.isPresent()) {
            return createDTO(optionalArticle.get());
        }
        throw new EntityDoesNotExistsException(id);
    }
    @Override
    public ArticleResponseDTO getArticleByTitle(String title) throws EntityDoesNotExistsException {
        Optional<Article> optionalArticle = articleRepository.findByTitle(title);

        if (optionalArticle.isPresent()) {
            return createDTO(optionalArticle.get());
        }
        throw new EntityDoesNotExistsException("Article with title '%s' not found!".formatted(title));
    }

    @Override
    public ArticleResponseDTO updateArticle(String slug, SetArticleDTO articleDTO) throws EntityDoesNotExistsException {
        Optional<Article> optionalArticle = articleRepository.findBySlug(slug);
        if (optionalArticle.isEmpty()) {
            throw new EntityDoesNotExistsException("Article with slug '%s' not found!".formatted(slug));
        }
        Article oldArticle = optionalArticle.get();
        oldArticle.setTitle(articleDTO.title());
        oldArticle.setDescription(articleDTO.description());
        oldArticle.setBody(articleDTO.body());
        oldArticle.setBackgroundColor(articleDTO.backgroundColor());
        oldArticle.setFontColor(articleDTO.fontColor());
        oldArticle.setEmoji(articleDTO.emoji());
        oldArticle.setSlug(articleDTO.newSlug());



        //Zwei Listen zu Vergleichen

        //entfernen die Datenbeziehungen, die nicht in der neuen Liste enthalten sind
        for (String tag : oldArticle.getTagList()) {
            if (!articleDTO.tagList().contains(tag)) {
                ArticleTagId relId = new ArticleTagId(articleDTO.articleId(), tag);
                catsRepository.deleteById(relId);
            }
        }
        //alle Dbzhng von neue Liste zu speichern, und die nicht vorhandenen Tags zu erstellen
        //Creating tags that did not exist
        for (String tagName : articleDTO.tagList()) {
            if (!oldArticle.getTagList().contains(tagName)) {
                Optional<Tag> optTag = tagRepository.findByName(tagName);
                Tag tag = optTag.orElseGet(() -> tagRepository.save(new Tag(tagName)));
                ArticleTag articleTag = new ArticleTag(oldArticle, tag);
                catsRepository.save(articleTag);
            }
        }
        //save

        String imageURL = "";

        if (!Objects.isNull(articleDTO.image())) {
            imageURL = awsService.uploadArticleImage(articleDTO.image(), articleDTO.slug());
        }
        oldArticle.setImageURL(imageURL);
        oldArticle.setUpdatedAt(LocalDateTime.now());

        return createDTO(articleRepository.save(oldArticle));
    }

    @Override
    public void deleteArticle(Long id) throws EntityDoesNotExistsException {
        if (!articleRepository.existsById(id)) {
            throw new EntityDoesNotExistsException(id);
        }
        articleRepository.deleteById(id);
    }


    @Override
    public void deleteArticleBySlug(String articleSlug) throws EntityDoesNotExistsException {
        Optional<Article> optionalArticle = articleRepository.findBySlug(articleSlug);
        if (optionalArticle.isEmpty()) {
            throw new EntityDoesNotExistsException("Article with slug '%s' do not exists!".formatted(articleSlug));
        }

        //Delete all tag relations
        Article article = optionalArticle.get();
        ArticleTagId articleTagId = new ArticleTagId();
        articleTagId.setArticleId(article.getId());
        ArticleTag articleTagRelation = new ArticleTag();
        articleTagRelation.setId(articleTagId);
        List<ArticleTag> artTagRelation = catsRepository.findAll(Example.of(articleTagRelation));
        catsRepository.deleteAll(artTagRelation);

        //Delete all favorite user relations
        ArticleUserId articleUserId = new ArticleUserId();
        articleUserId.setArticleId(article.getId());
        ArticleUser articleUserRelation = new ArticleUser();
        articleUserRelation.setId(articleUserId);
        List<ArticleUser> relations = favsRepository.findAll(Example.of(articleUserRelation));
        favsRepository.deleteAll(relations);

        articleRepository.delete(article);
    }

    //Operations with Author
    @Override
    public List<ArticleResponseDTO> getByAuthor(String username) throws EntityDoesNotExistsException {
        Optional<User> user = userRepository.findByUsername(username);
        if (user.isEmpty() ) {
            throw new EntityDoesNotExistsException("User with username: %s does not exist!".formatted(username));
        }

        List<Article> articleList = articleRepository.findArticleByAuthor(user.get());
        return articleList.stream().map(this::createDTO).toList();
    }

    //Operations with Users

    @Override
    public List<UserResponseDTO> getFavUsers(String slug) throws EntityDoesNotExistsException {
        if (!articleRepository.existsBySlug(slug)) {
            throw new EntityDoesNotExistsException("Article with slug '%s' do not exists!".formatted(slug));
        }
        Article article = articleRepository.findBySlug(slug).get();
        List<ArticleUser> favoriteList = favsRepository.findByArticleId(article.getId());
        List<User> userList = favoriteList.stream().map(ArticleUser :: getUser).toList();
        return userList.stream().map(user -> userService.createDTO(user)).toList();
    }

    @Override
    public ArticleResponseDTO setFavorite(String slug, String username) throws EntityDoesNotExistsException {
        if (!articleRepository.existsBySlug(slug)) {
            throw new EntityDoesNotExistsException("Article with slug '%s' do not exists!".formatted(slug));
        }
        if (!userRepository.existsByUsername(username)) {
            throw new EntityDoesNotExistsException("User with username: %s does not exist!".formatted(username));
        }
        Article article = articleRepository.findBySlug(slug).get();
        User user = userRepository.findByUsername(username).get();
        ArticleUser relation = new ArticleUser(user, article);
        favsRepository.save(relation);
        return createDTO(article);
    }

    @Override
    public ArticleResponseDTO removeFavorite(String slug, String username) throws EntityDoesNotExistsException {
        if (!articleRepository.existsBySlug(slug)) {
            throw new EntityDoesNotExistsException("Article with slug '%s' do not exists!".formatted(slug));
        }
        if (!userRepository.existsByUsername(username)) {
            throw new EntityDoesNotExistsException("User with username: %s does not exist!".formatted(username));
        }
        Article article = articleRepository.findBySlug(slug).get();
        User user = userRepository.findByUsername(username).get();
        ArticleUserId relationId = new ArticleUserId(user.getId(), article.getId());
        Optional<ArticleUser> relation = favsRepository.findById(relationId);
        if (relation.isPresent()) {
            favsRepository.deleteById(relationId);
        }
        return createDTO(article);
    }

    @Override
    public boolean isFavorite(String slug, String username) {
        Article article = articleRepository.findBySlug(slug).get();
        User user = userRepository.findByUsername(username).get();
        ArticleUserId relationId = new ArticleUserId(user.getId(), article.getId());
        return favsRepository.existsById(relationId);
    }

    @Override
    public List<ArticleResponseDTO> getFavArticles(String username) throws EntityDoesNotExistsException {
        if (!userRepository.existsByUsername(username)) {
            throw new EntityDoesNotExistsException("User with username: %s does not exist!".formatted(username));
        }
        User user = userRepository.findByUsername(username).get();
        List<ArticleUser> relations = favsRepository.findByUserId(user.getId());
        List<Article> articleList = relations.stream().map(ArticleUser::getArticle).toList();
        return articleList.stream().map(this::createDTO).toList();
    }

    //Operations with tags
    @Override
    public List<ArticleResponseDTO> getArticlesByTag(String tagName) throws TagNotFoundException {
        if (!tagRepository.existsByName(tagName)) {
            throw new TagNotFoundException(tagName);
        }

        List<ArticleTag> relations = catsRepository.findByTagName(tagName);
        List<Article> articleList = relations.stream().map(ArticleTag::getArticle).toList();
        return articleList.stream().map(this::createDTO).toList();
    }



    @Override
    public ArticleResponseDTO setTag(String slug, String tagName) throws EntityDoesNotExistsException {
        if (!articleRepository.existsBySlug(slug)) {
            throw new EntityDoesNotExistsException("Article with slug '%s' do not exists!".formatted(slug));
        }
        Article article = articleRepository.findBySlug(slug).get();

        Optional<Tag> tag = tagRepository.findByName(tagName);
        if (tag.isPresent()) {
            ArticleTagId relationId = new ArticleTagId(article.getId(), tagName);
            Optional<ArticleTag> relation = catsRepository.findById(relationId);
            //tag exists but is not related to the article yet
            if (relation.isEmpty()) {
                ArticleTag newRelation = new ArticleTag(article, tag.get());
                catsRepository.save(newRelation);
            }
        }
        if (tag.isEmpty()) {
            //If tag does not exist, neither does the relation, so we create a newTag and a new relation
            Tag newTag = new Tag(tagName);
            Set<ArticleTag> relations = new HashSet<>();
            ArticleTag newRelation = new ArticleTag(article, newTag);
            relations.add(newRelation);
            newTag.setArticles(relations);
            tagRepository.save(newTag);
            catsRepository.save(newRelation);
        }
        return createDTO(articleRepository.findBySlug(slug).get());

    }

    @Override
    public ArticleResponseDTO removeTag(String slug, String tagName) throws EntityDoesNotExistsException {
        if (!articleRepository.existsBySlug(slug)) {
            throw new EntityDoesNotExistsException("Article with slug '%s' do not exists!".formatted(slug));
        }
        Article article = articleRepository.findBySlug(slug).get();
        ArticleTagId relationId = new ArticleTagId(article.getId(), tagName);
        Optional<ArticleTag> relation = catsRepository.findById(relationId);
        if (relation.isPresent()) {
            catsRepository.delete(relation.get());
        }
        return createDTO(articleRepository.findBySlug(slug).get());
    }

    @Override
    public ArticleResponseDTO setFontColor(String slug, String fontColor) throws EntityDoesNotExistsException {
        Optional<Article> article = articleRepository.findBySlug(slug);
        if (article.isEmpty()) {
            throw new EntityDoesNotExistsException("Article with slug '%s' do not exists!".formatted(slug));
        }
        Article art = article.get();
        art.setFontColor(fontColor);
        return this.createDTO(articleRepository.save(art));
    }

    @Override
    public ArticleResponseDTO setBackgroundColor(String slug, String backgroundColor) throws EntityDoesNotExistsException {
        Optional<Article> article = articleRepository.findBySlug(slug);
        if (article.isEmpty()) {
            throw new EntityDoesNotExistsException("Article with slug '%s' do not exists!".formatted(slug));
        }
        Article art = article.get();
        art.setBackgroundColor(backgroundColor);
        return this.createDTO(articleRepository.save(art));
    }

    @Override
    public ArticleResponseDTO setEmoji(String slug, String emoji) throws EntityDoesNotExistsException {
        Optional<Article> article = articleRepository.findBySlug(slug);
        if (article.isEmpty()) {
            throw new EntityDoesNotExistsException("Article with slug '%s' do not exists!".formatted(slug));
        }
        Article art = article.get();
        art.setEmoji(emoji);
        return this.createDTO(articleRepository.save(art));
    }
}
