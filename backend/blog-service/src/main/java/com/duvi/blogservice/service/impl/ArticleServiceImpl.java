package com.duvi.blogservice.service.impl;

import com.cloudinary.Cloudinary;
import com.cloudinary.api.ApiResponse;
import com.cloudinary.api.exceptions.NotFound;
import com.cloudinary.utils.ObjectUtils;
import com.duvi.blogservice.model.Article;
import com.duvi.blogservice.model.Tag;
import com.duvi.blogservice.model.User;
import com.duvi.blogservice.model.dto.ArticleResponseDTO;
import com.duvi.blogservice.model.dto.SetArticleDTO;
import com.duvi.blogservice.model.dto.UserResponseDTO;
import com.duvi.blogservice.model.exceptions.EntityAlreadyExistsException;
import com.duvi.blogservice.model.exceptions.EntityDoesNotExistsException;
import com.duvi.blogservice.model.exceptions.ImageException;
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
import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
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
    public ArticleResponseDTO createDTO(Article article) {

        List<String> tagList = this.getTagsOf(article.getSlug()).stream().map((tag) -> tag.getName()).toList();
        Integer favsCount = 0;
        Boolean isFav = false;
        UserResponseDTO author = null;

        if (article.getFavUsers() != null) {
            favsCount = article.getFavUsers().size();
        }
        try {
            author = userService.findUserById(article.getAuthor().getId());
        } catch (EntityDoesNotExistsException unfe) {
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
        return !favArticles.stream().filter(rel -> rel.getArticle().getId() == articleId)
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
        };
        throw new EntityDoesNotExistsException(id);
    }
    @Override
    public ArticleResponseDTO getArticleByTitle(String title) throws EntityDoesNotExistsException {
        Optional<Article> optionalArticle = articleRepository.findByTitle(title);

        if (optionalArticle.isPresent()) {
            return createDTO(optionalArticle.get());
        };
        throw new EntityDoesNotExistsException("Article with title '%s' not found!".formatted(title));
    }

    @Override
    public ArticleResponseDTO updateArticle(Long articleId, SetArticleDTO articleDTO) throws EntityDoesNotExistsException {
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
    public ArticleResponseDTO updateArticleBySlug(String articleSlug, SetArticleDTO articleDTO) throws EntityDoesNotExistsException {
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
    public ArticleResponseDTO setFavorite(String slug, String username) throws EntityDoesNotExistsException, EntityDoesNotExistsException {
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
    public ArticleResponseDTO removeFavorite(String slug, String username) throws EntityDoesNotExistsException, EntityDoesNotExistsException {
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
    public List<Tag> getTagsOf(String slug) {
        if (!articleRepository.existsBySlug(slug)) {
            return new ArrayList<>();
        }
        Article article = articleRepository.findBySlug(slug).get();
        List<ArticleTag> relations = catsRepository.findByArticleId(article.getId());
        return relations.stream().map(ArticleTag::getTag).toList();

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
    public String uploadBackgroundImage(MultipartFile backgroundImage, String articleSlug) throws ImageException {
        Dotenv dotenv = Dotenv.load();
        String cloudinaryURL = dotenv.get("CLOUDINARY_URL");
        if (cloudinaryURL == null) {
            return "There is no cloudinary API to upload images with!";
        }
        Cloudinary cloudinary = new Cloudinary(cloudinaryURL);
        cloudinary.config.secure = true;
        String publicId = "background/" + articleSlug + "-image";
        Map params = ObjectUtils.asMap(
                "overwrite", true,
                "public_id", publicId,
                "unique_filename", "true"
        );
        try {
            Map response = cloudinary.uploader().upload(backgroundImage.getBytes(), params);
            return "Image uploaded successfully, public_id is: " + response.get("public_id");

        } catch (IOException exception) {
            throw new ImageException("Couldn't upload image: " + exception.getMessage());
        }
    }

    @Override
    public String getBackgroundImage(String articleSlug) throws NotFound {
        Dotenv dotenv = Dotenv.load();
        String cloudinaryURL = dotenv.get("CLOUDINARY_URL");
        if (cloudinaryURL == null) {
            return "";
        }
        Cloudinary cloudinary = new Cloudinary(cloudinaryURL);
        cloudinary.config.secure = true;
        Map options = ObjectUtils.asMap();
        String publicId = "/background/" + articleSlug + "-image";
        try {
            ApiResponse image = cloudinary.api().resource(publicId, options);

            return (String) image.get("secure_url");
        } catch (NotFound notFound) {
            throw notFound;
        }
        catch (Exception exception) {
            exception.printStackTrace();
            return "";
        }
    }

    @Override
    public ArticleResponseDTO setFontColor(String slug, String fontColor) throws EntityDoesNotExistsException {
        Optional<Article> article = articleRepository.findBySlug(slug);
        if (article.isEmpty()) {
            throw new EntityDoesNotExistsException("Article with slug '%s' do not exists!".formatted(slug));
        };
        Article art = article.get();
        art.setFontColor(fontColor);
        return this.createDTO(articleRepository.save(art));
    }

    @Override
    public ArticleResponseDTO setBackgroundColor(String slug, String backgroundColor) throws EntityDoesNotExistsException {
        Optional<Article> article = articleRepository.findBySlug(slug);
        if (article.isEmpty()) {
            throw new EntityDoesNotExistsException("Article with slug '%s' do not exists!".formatted(slug));
        };
        Article art = article.get();
        art.setBackgroundColor(backgroundColor);
        return this.createDTO(articleRepository.save(art));
    }

    @Override
    public ArticleResponseDTO setEmoji(String slug, String emoji) throws EntityDoesNotExistsException {
        Optional<Article> article = articleRepository.findBySlug(slug);
        if (article.isEmpty()) {
            throw new EntityDoesNotExistsException("Article with slug '%s' do not exists!".formatted(slug));
        };
        Article art = article.get();
        art.setEmoji(emoji);
        return this.createDTO(articleRepository.save(art));
    }
}
