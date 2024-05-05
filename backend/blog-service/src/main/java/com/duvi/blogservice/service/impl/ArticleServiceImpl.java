package com.duvi.blogservice.service.impl;

import com.duvi.blogservice.model.Article;
import com.duvi.blogservice.model.Tag;
import com.duvi.blogservice.model.User;
import com.duvi.blogservice.model.dto.ArticleDTO;
import com.duvi.blogservice.model.dto.SetArticleDTO;
import com.duvi.blogservice.model.dto.UserDTO;
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
import com.duvi.blogservice.service.ArticleService;
import com.duvi.blogservice.service.CommentService;
import com.duvi.blogservice.service.UserService;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class ArticleServiceImpl implements ArticleService {

    private ArticleRepository articleRepository;
    private UserRepository userRepository;
    private ArticleUserRepository favsRepository;
    private ArticleTagRepository catsRepository;
    private TagRepository tagRepository;
    private UserService userService;

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
    public ArticleDTO createDTO(Article article) {

        List<String> tagList = this.getTagsOf(article.getSlug()).stream().map((tag) -> tag.getName()).toList();
        Integer favsCount = 0;
        Boolean isFav = false;
        UserDTO author = null;

        if (article.getFavUsers() != null) {
            favsCount = article.getFavUsers().size();
        }
        try {
            author = userService.findUserById(article.getAuthor().getId());
        } catch (EntityDoesNotExistsException unfe) {
        }

        return new ArticleDTO(
                article.getId(),
                author,
                article.getTitle(),
                article.getBody(),
                article.getDescription(),
                article.getSlug(),
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
        return !favArticles.stream().filter(rel -> rel.getArticle().getId() == articleId)
                .toList()
                .isEmpty();
    }
    //Basic CRUD Operations
    @Override
    public List<ArticleDTO> getArticlesSorted(){
        List<Article> articleList = articleRepository.findAll(Sort.by(Sort.Direction.DESC, "updatedAt"));
        return articleList.stream().map(article -> createDTO(article)).toList();
    }
    @Override
    public List<ArticleDTO> getArticles()  {
        List<Article> articleList = articleRepository.findAll();
        return articleList.stream().map(article -> createDTO(article)).toList();
    }
    @Override
    public ArticleDTO createArticle(SetArticleDTO articleDTO) throws EntityAlreadyExistsException, EntityDoesNotExistsException {
        if (!articleRepository.existsByTitle(articleDTO.title())) {
            User user = userRepository.findById(articleDTO.userId()).get();
            Article article = new Article(articleDTO, user);
            articleRepository.save(article);
            for (String tag : articleDTO.tagList()) {
                this.setTag(articleDTO.slug(), tag);
            }
            return createDTO(articleRepository.findBySlug(articleDTO.slug()).get());
        }
        throw new EntityAlreadyExistsException(articleDTO.title());
    }

    @Override
    public ArticleDTO getArticleBySlug(String articleSlug) throws EntityDoesNotExistsException {
        Optional<Article> optArticle = articleRepository.findBySlug(articleSlug);
        if (optArticle.isEmpty()) {
            throw new EntityDoesNotExistsException("Article with slug '%s' do not exists!".formatted(articleSlug));
        }
        Article article = optArticle.get();
        return createDTO(article);
    }
    @Override
    public ArticleDTO getArticleById(Long id) throws EntityDoesNotExistsException {
        Optional<Article> optionalArticle = articleRepository.findById(id);
        if (optionalArticle.isPresent()) {
            return createDTO(optionalArticle.get());
        };
        throw new EntityDoesNotExistsException(id);
    }
    @Override
    public ArticleDTO getArticleByTitle(String title) throws EntityDoesNotExistsException {
        Optional<Article> optionalArticle = articleRepository.findByTitle(title);

        if (optionalArticle.isPresent()) {
            return createDTO(optionalArticle.get());
        };
        throw new EntityDoesNotExistsException("Article with title '%s' not found!".formatted(title));
    }

    @Override
    public ArticleDTO updateArticle(Long articleId, SetArticleDTO articleDTO) throws EntityDoesNotExistsException {
        Optional<Article> optionalArticle = articleRepository.findById(articleId);
        if (optionalArticle.isEmpty()) {
            throw new EntityDoesNotExistsException(articleId);
        }
        Article oldArticle = optionalArticle.get();
        oldArticle.updateWith(articleDTO);
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
    public ArticleDTO updateArticleBySlug(String articleSlug, SetArticleDTO articleDTO) throws EntityDoesNotExistsException {
        Optional<Article> optionalArticle = articleRepository.findBySlug(articleSlug);
        if (optionalArticle.isEmpty()) {
            throw new EntityDoesNotExistsException("Article with slug '%s' do not exists!".formatted(articleSlug));
        }
        Article oldArticle = optionalArticle.get();
        oldArticle.updateWith(articleDTO);
        return createDTO(articleRepository.save(oldArticle));
    }

    @Override
    public void deleteArticleBySlug(String articleSlug) throws EntityDoesNotExistsException {
        if (!articleRepository.existsBySlug(articleSlug)) {
            throw new EntityDoesNotExistsException("Article with slug '%s' do not exists!".formatted(articleSlug));
        }
        articleRepository.deleteBySlug(articleSlug);
    }

    //Operations with Author
    @Override
    public List<ArticleDTO> getByAuthor(String username) throws EntityDoesNotExistsException {
        Optional<User> user = userRepository.findByUsername(username);
        if (user.isEmpty() ) {
            throw new EntityDoesNotExistsException("User with username: %s does not exist!".formatted(username));
        }

        List<Article> articleList = articleRepository.findArticleByAuthor(user.get());
        return articleList.stream().map(this::createDTO).toList();
    }

    //Operations with Users

    @Override
    public List<UserDTO> getFavUsers(String slug) throws EntityDoesNotExistsException {
        if (!articleRepository.existsBySlug(slug)) {
            throw new EntityDoesNotExistsException("Article with slug '%s' do not exists!".formatted(slug));
        }
        Article article = articleRepository.findBySlug(slug).get();
        List<ArticleUser> favoriteList = favsRepository.findByArticleId(article.getId());
        List<User> userList = favoriteList.stream().map(ArticleUser :: getUser).toList();
        return userList.stream().map(user -> userService.createDTO(user)).toList();
    }

    @Override
    public ArticleDTO setFavorite(String slug, String username) throws EntityDoesNotExistsException, EntityDoesNotExistsException {
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
    public ArticleDTO removeFavorite(String slug, String username) throws EntityDoesNotExistsException, EntityDoesNotExistsException {
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
    public boolean isFavorite(String slug, String username) throws EntityDoesNotExistsException {
        Article article = articleRepository.findBySlug(slug).get();
        User user = userRepository.findByUsername(username).get();
        ArticleUserId relationId = new ArticleUserId(user.getId(), article.getId());
        return favsRepository.existsById(relationId);
    }

    @Override
    public List<ArticleDTO> getFavArticles(String username) throws EntityDoesNotExistsException {
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
    public List<ArticleDTO> getArticlesByTag(String tagName) throws TagNotFoundException {
        if (!tagRepository.existsByName(tagName)) {
            throw new TagNotFoundException(tagName);
        }

        List<ArticleTag> relations = catsRepository.findByTagName(tagName);
        List<Article> articleList = relations.stream().map(ArticleTag::getArticle).toList();
        return articleList.stream().map(this::createDTO).toList();
    }

    @Override
    public List<Tag> getTagsOf(String slug) {
        if (!articleRepository.existsBySlug(slug)) {
            return new ArrayList<>();
        }
        Article article = articleRepository.findBySlug(slug).get();
        List<ArticleTag> relations = catsRepository.findByArticleId(article.getId());
        return relations.stream().map(ArticleTag::getTag).toList();

    }

    @Override
    public ArticleDTO setTag(String slug, String tagName) throws EntityDoesNotExistsException {
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
            //If tag does not exist, neither does the relation so we create a newTag and a new relation
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
    public ArticleDTO removeTag(String slug, String tagName) throws EntityDoesNotExistsException {
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




}
