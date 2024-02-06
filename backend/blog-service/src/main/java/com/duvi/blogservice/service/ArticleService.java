package com.duvi.blogservice.service;

import com.duvi.blogservice.model.Article;
import com.duvi.blogservice.model.dto.ArticleDTO;
import com.duvi.blogservice.model.exceptions.ArticleAlreadyExistsException;
import com.duvi.blogservice.model.exceptions.ArticleDoNotExistsException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ArticleService {

    Article createArticle(ArticleDTO articleDTO) throws ArticleAlreadyExistsException;
    List<Article> getArticles() throws ArticleDoNotExistsException;
    List<Article> getArticlesByFavorite();
    List<Article> getArticlesByUser();
    List<Article> getArticlesByTag();
    Article getArticleById(Long id) throws ArticleDoNotExistsException;
    Article getArticleByTitle(String title) throws ArticleDoNotExistsException;
    Article updateArticle(Long articleId, ArticleDTO newArticleDTO);
    void deleteArticle(Long id) throws ArticleDoNotExistsException;

}
