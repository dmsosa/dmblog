package com.duvi.blogservice.service.impl;

import com.duvi.blogservice.model.Article;
import com.duvi.blogservice.model.dto.ArticleDTO;
import com.duvi.blogservice.model.exceptions.ArticleAlreadyExistsException;
import com.duvi.blogservice.model.exceptions.ArticleDoNotExistsException;
import com.duvi.blogservice.repository.ArticleRepository;
import com.duvi.blogservice.service.ArticleService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ArticleServiceImpl implements ArticleService {

    private ArticleRepository articleRepository;

    public ArticleServiceImpl(ArticleRepository articleRepository) {
        this.articleRepository = articleRepository;
    }

    @Override
    public Article createArticle(ArticleDTO articleDTO) throws ArticleAlreadyExistsException {
        if (!articleRepository.existsByTitle(articleDTO.title())) {
            Article article = new Article(articleDTO);
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
        Article newArticle = new Article(newArticleDTO);
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
}
