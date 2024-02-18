package com.duvi.blogservice.service.impl;

import com.duvi.blogservice.model.Article;
import com.duvi.blogservice.model.Tag;
import com.duvi.blogservice.model.User;
import com.duvi.blogservice.model.dto.ArticleDTO;
import com.duvi.blogservice.model.dto.CommentDTO;
import com.duvi.blogservice.model.dto.SetArticleDTO;
import com.duvi.blogservice.model.dto.UserDTO;
import com.duvi.blogservice.model.exceptions.ArticleAlreadyExistsException;
import com.duvi.blogservice.model.exceptions.ArticleDoNotExistsException;
import com.duvi.blogservice.model.exceptions.TagNotFoundException;
import com.duvi.blogservice.model.exceptions.UserNotFoundException;
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
import jakarta.annotation.Nullable;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class ArticleServiceImpl implements ArticleService {

    private ArticleRepository articleRepository;
    private UserRepository userRepository;
    private ArticleUserRepository favsRepository;
    private ArticleTagRepository catsRepository;
    private TagRepository tagRepository;
    private CommentRepository commentRepository;
    private UserService userService;
    private CommentService commentService;

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
        this.commentRepository = commentRepository;
        this.userService = userService;
        this.commentService = commentService;
    }

    //CreateDTO
    @Override
    public ArticleDTO createDTO(Article article) {

        List<String> tagList = this.getTagsOf(article.getSlug()).stream().map((tag) -> tag.getName()).toList();
        Integer favsCount = 0;
        if (article.getFavUsers() != null) {
            favsCount = article.getFavUsers().size();
        }


        return new ArticleDTO(
                article.getId(),
                article.getAuthor().getId(),
                article.getTitle(),
                article.getBody(),
                article.getDescription(),
                article.getSlug(),
                tagList,
                article.getCreatedAt(),
                article.getUpdatedAt(),
                favsCount
        );
    }

    //Basic CRUD Operations
    @Override
    public List<ArticleDTO> getArticles() throws ArticleDoNotExistsException {
        List<Article> articleList = articleRepository.findAll();
        if (articleList.isEmpty()) {
            throw new ArticleDoNotExistsException("No articles found!");
        }
        return articleList.stream().map(this::createDTO).toList();
    }
    @Override
    public ArticleDTO createArticle(SetArticleDTO articleDTO) throws ArticleAlreadyExistsException, ArticleDoNotExistsException {
        if (!articleRepository.existsByTitle(articleDTO.title())) {
            User user = userRepository.findById(articleDTO.userId()).get();
            Article article = new Article(articleDTO, user);
            articleRepository.save(article);
            for (String tag : articleDTO.tagList()) {
                this.setTag(articleDTO.slug(), tag);
            }
            return createDTO(articleRepository.findBySlug(articleDTO.slug()).get());
        }
        throw new ArticleAlreadyExistsException(articleDTO.title());
    }

    @Override
    public ArticleDTO getArticleBySlug(String articleSlug) throws ArticleDoNotExistsException {
        Optional<Article> optArticle = articleRepository.findBySlug(articleSlug);
        if (optArticle.isEmpty()) {
            throw new ArticleDoNotExistsException("Article with slug '%s' do not exists!".formatted(articleSlug));
        }
        Article article = optArticle.get();
        return createDTO(article);
    }
    @Override
    public ArticleDTO getArticleById(Long id) throws ArticleDoNotExistsException {
        Optional<Article> optionalArticle = articleRepository.findById(id);
        if (optionalArticle.isPresent()) {
            return createDTO(optionalArticle.get());
        };
        throw new ArticleDoNotExistsException(id);
    }
    @Override
    public ArticleDTO getArticleByTitle(String title) throws ArticleDoNotExistsException {
        Optional<Article> optionalArticle = articleRepository.findByTitle(title);

        if (optionalArticle.isPresent()) {
            return createDTO(optionalArticle.get());
        };
        throw new ArticleDoNotExistsException("Article with title '%s' not found!".formatted(title));
    }

    @Override
    public ArticleDTO updateArticle(Long articleId, SetArticleDTO articleDTO) throws ArticleDoNotExistsException {
        Optional<Article> optionalArticle = articleRepository.findById(articleId);
        if (optionalArticle.isEmpty()) {
            throw new ArticleDoNotExistsException(articleId);
        }
        Article oldArticle = optionalArticle.get();
        oldArticle.updateWith(articleDTO);
        return createDTO(articleRepository.save(oldArticle));
    }

    @Override
    public void deleteArticle(Long id) throws ArticleDoNotExistsException {
        if (!articleRepository.existsById(id)) {
            throw new ArticleDoNotExistsException(id);
        }
        articleRepository.deleteById(id);
    }
    @Override
    public ArticleDTO updateArticleBySlug(String articleSlug, SetArticleDTO articleDTO) throws ArticleDoNotExistsException {
        Optional<Article> optionalArticle = articleRepository.findBySlug(articleSlug);
        if (optionalArticle.isEmpty()) {
            throw new ArticleDoNotExistsException("Article with slug '%s' do not exists!".formatted(articleSlug));
        }
        Article oldArticle = optionalArticle.get();
        oldArticle.updateWith(articleDTO);
        return createDTO(articleRepository.save(oldArticle));
    }

    @Override
    public void deleteArticleBySlug(String articleSlug) throws ArticleDoNotExistsException {
        if (!articleRepository.existsBySlug(articleSlug)) {
            throw new ArticleDoNotExistsException("Article with slug '%s' do not exists!".formatted(articleSlug));
        }
        articleRepository.deleteBySlug(articleSlug);
    }

    //Operations with Author
    @Override
    public List<ArticleDTO> getByAuthor(String username) throws UserNotFoundException {
        Optional<User> user = userRepository.findByUsername(username);
        if (user.isEmpty() ) {
            throw new UserNotFoundException("User with username: %s does not exist!".formatted(username));
        }

        List<Article> articleList = articleRepository.findArticleByAuthor(user.get());
        return articleList.stream().map(this::createDTO).toList();
    }

    //Operations with Users

    @Override
    public List<UserDTO> getFavUsers(String slug) throws ArticleDoNotExistsException {
        if (!articleRepository.existsBySlug(slug)) {
            throw new ArticleDoNotExistsException("Article with slug '%s' do not exists!".formatted(slug));
        }
        Article article = articleRepository.findBySlug(slug).get();
        List<ArticleUser> favoriteList = favsRepository.findByArticleId(article.getId());
        List<User> userList = favoriteList.stream().map(ArticleUser :: getUser).toList();
        return userList.stream().map(user -> userService.createDTO(user)).toList();
    }

    @Override
    public ArticleDTO setFavorite(String slug, String username) throws ArticleDoNotExistsException, UserNotFoundException {
        if (!articleRepository.existsBySlug(slug)) {
            throw new ArticleDoNotExistsException("Article with slug '%s' do not exists!".formatted(slug));
        }
        if (!userRepository.existsByUsername(username)) {
            throw new UserNotFoundException("User with username: %s does not exist!".formatted(username));
        }
        Article article = articleRepository.findBySlug(slug).get();
        User user = userRepository.findByUsername(username).get();
        ArticleUser relation = new ArticleUser(user, article);
        favsRepository.save(relation);
        return createDTO(article);
    }

    @Override
    public ArticleDTO removeFavorite(String slug, String username) throws ArticleDoNotExistsException, UserNotFoundException {
        if (!articleRepository.existsBySlug(slug)) {
            throw new ArticleDoNotExistsException("Article with slug '%s' do not exists!".formatted(slug));
        }
        if (!userRepository.existsByUsername(username)) {
            throw new UserNotFoundException("User with username: %s does not exist!".formatted(username));
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
    public boolean isFavorite(String slug, String username) throws ArticleDoNotExistsException {
        Article article = articleRepository.findBySlug(slug).get();
        User user = userRepository.findByUsername(username).get();
        ArticleUserId relationId = new ArticleUserId(user.getId(), article.getId());
        return favsRepository.existsById(relationId);
    }

    @Override
    public List<ArticleDTO> getFavArticles(String username) throws UserNotFoundException {
        if (!userRepository.existsByUsername(username)) {
            throw new UserNotFoundException("User with username: %s does not exist!".formatted(username));
        }
        User user = userRepository.findByUsername(username).get();
        List<ArticleUser> relations = favsRepository.findByUserId(user.getId());
        List<Article> articleList = relations.stream().map(ArticleUser::getArticle).toList();
        return articleList.stream().map(this::createDTO).toList();
    }

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
    public ArticleDTO setTag(String slug, String tagName) throws ArticleDoNotExistsException {
        if (!articleRepository.existsBySlug(slug)) {
            throw new ArticleDoNotExistsException("Article with slug '%s' do not exists!".formatted(slug));
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
    public ArticleDTO removeTag(String slug, String tagName) throws ArticleDoNotExistsException {
        if (!articleRepository.existsBySlug(slug)) {
            throw new ArticleDoNotExistsException("Article with slug '%s' do not exists!".formatted(slug));
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
    public List<CommentDTO> getCommentsOf(String slug) throws ArticleDoNotExistsException {
        if (!articleRepository.existsBySlug(slug)) {
            throw new ArticleDoNotExistsException("Article with slug '%s' do not exists!".formatted(slug));
        }
        Article article = articleRepository.findBySlug(slug).get();
        return commentRepository.findByArticleId(article.getId()).stream().map(comment -> commentService.createDTO(comment)).toList();
    }


}
