package com.duvi.blogservice.service;

import com.duvi.blogservice.model.Article;
import com.duvi.blogservice.model.dto.ArticleDTO;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ArticleService {

    Article createArticle(ArticleDTO articleDTO);
    List<Article> getArticles();
    Article getArticleById(Long id);
    Article updateArticle(Long articleId, ArticleDTO newArticleDTO);
    void deleteArticle(Long id);

}
