package com.duvi.blogservice.service.impl;

import com.duvi.blogservice.model.Article;
import com.duvi.blogservice.model.User;
import com.duvi.blogservice.model.dto.ArticleDTO;
import com.duvi.blogservice.model.exceptions.ArticleAlreadyExistsException;
import com.duvi.blogservice.model.exceptions.ArticleDoNotExistsException;
import com.duvi.blogservice.model.exceptions.UserNotFoundException;
import com.duvi.blogservice.repository.ArticleRepository;
import com.duvi.blogservice.repository.UserRepository;
import com.duvi.blogservice.service.ArticleService;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class ArticleServiceImpl implements ArticleService {

    private ArticleRepository articleRepository;
    private UserRepository userRepository;
    public ArticleServiceImpl(ArticleRepository articleRepository, UserRepository userRepository) {
        this.articleRepository = articleRepository;
        this.userRepository = userRepository;
    }

    //Basic CRUD Operations
    @Override
    public Article createArticle(ArticleDTO articleDTO) throws ArticleAlreadyExistsException {
        if (!articleRepository.existsByTitle(articleDTO.title())) {
            User user = userRepository.findById(articleDTO.userId()).get();
            Article article = new Article(articleDTO, user);
            articleRepository.save(article);
        }
        throw new ArticleAlreadyExistsException(articleDTO.title());
    }



    @Override
    public List<Article> getArticles() throws ArticleDoNotExistsException {
        List<Article> articleList = articleRepository.findAll();
        if (articleList.isEmpty()) {
            throw new ArticleDoNotExistsException("No articles found!");
        }
        return  articleList;
    }

    @Override
    public Article getArticleBySlug(String articleSlug) throws ArticleDoNotExistsException {
        Optional<Article> optArticle = articleRepository.findBySlug(articleSlug);
        if (optArticle.isEmpty()) {
            throw new ArticleDoNotExistsException("Article with slug '%s' do not exists!".formatted(articleSlug));
        }
        Article article = optArticle.get();
        return article;
    }
    @Override
    public Article getArticleById(Long id) throws ArticleDoNotExistsException {
        Optional<Article> optionalArticle = articleRepository.findById(id);
        if (optionalArticle.isPresent()) {
            return optionalArticle.get();
        };
        throw new ArticleDoNotExistsException(id);
    }
    @Override
    public Article getArticleByTitle(String title) throws ArticleDoNotExistsException {
        Optional<Article> optionalArticle = articleRepository.findByTitle(title);

        if (optionalArticle.isPresent()) {
            return optionalArticle.get();
        };
        throw new ArticleDoNotExistsException("Article with title '%s' not found!".formatted(title));
    }

    @Override
    public Article updateArticle(Long articleId, ArticleDTO newArticleDTO) {
        Optional<Article> optionalArticle = articleRepository.findById(articleId);
        User user = userRepository.findById(newArticleDTO.userId()).get();
        Article newArticle = new Article(newArticleDTO, user);
        if (optionalArticle.isPresent()) {
            Article oldArticle = optionalArticle.get();
            oldArticle.update(newArticle);
            return articleRepository.save(oldArticle);
        }
        return articleRepository.save(newArticle);
    }

    @Override
    public void deleteArticle(Long id) throws ArticleDoNotExistsException {
        if (!articleRepository.existsById(id)) {
            throw new ArticleDoNotExistsException(id);
        }
        articleRepository.deleteById(id);
    }

    //Operations with Users and Tags

    @Override
    public Set<User> getFavsForArticle(Long articleId) throws ArticleDoNotExistsException {
        Optional<Article> optArticle = articleRepository.findById(articleId);
        if (optArticle.isEmpty()) {
            throw new ArticleDoNotExistsException(articleId);
        }
        Article article = optArticle.get();
        return article.getFavUsers();
    }

    @Override
    public Article setFavsForUser(Long articleId, String username) throws ArticleDoNotExistsException, UserNotFoundException {
        Optional<Article> optArticle = articleRepository.findById(articleId);
        if (optArticle.isEmpty()) {
            throw new ArticleDoNotExistsException(articleId);
        }
        Article article = optArticle.get();

        Optional<User> optUser = userRepository.findByUsername(username);
        if (optUser.isEmpty()) {
            throw new UserNotFoundException("User with username '%s' do not exists!".formatted(username));
        }
        User user = optUser.get();
        Set<User> favUsers = article.getFavUsers();
        if (favUsers == null) {
            Set<User> newUsers = Set.of(user);
            article.setFavUsers(newUsers);
        } else {
            favUsers.add(user);
        }

        return article;
    }

    @Override
    public List<Article> getFavsByUser(String username) throws UserNotFoundException {
        Optional<User> user = userRepository.findByUsername(username);
        if (user.isEmpty() ) {
            throw new UserNotFoundException("User with username: %s does not exist!".formatted(username));
        }

        return articleRepository.findArticleByUserId(user.get().getId());
    }
    @Override
    public List<Article> getArticlesByTag() {
        List<Article> articleList = articleRepository.findAll();

        return  articleList;
    }


}
