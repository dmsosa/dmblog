package com.duvi.blogservice.service.impl;

import com.duvi.blogservice.model.Article;
import com.duvi.blogservice.model.dto.ArticleDTO;
import com.duvi.blogservice.service.ArticleService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ArticleServiceImpl implements ArticleService {
    @Override
    public Article createArticle(ArticleDTO articleDTO) {
        return null;
    }

    @Override
    public List<Article> getArticles() {
        return null;
    }

    @Override
    public Article getArticleById(Long id) {
        return null;
    }

    @Override
    public Article updateArticle(Long articleId, ArticleDTO newArticleDTO) {
        return null;
    }

    @Override
    public void deleteArticle(Long id) {

    }
}
