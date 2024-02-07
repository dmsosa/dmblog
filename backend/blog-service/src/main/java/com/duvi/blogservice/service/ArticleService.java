package com.duvi.blogservice.service;

import com.duvi.blogservice.model.Article;
import com.duvi.blogservice.model.User;
import com.duvi.blogservice.model.dto.ArticleDTO;
import com.duvi.blogservice.model.exceptions.ArticleAlreadyExistsException;
import com.duvi.blogservice.model.exceptions.ArticleDoNotExistsException;
import com.duvi.blogservice.model.exceptions.UserNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

@Service
public interface ArticleService {

    //Basic CRUD Operations
    List<Article> getArticles() throws ArticleDoNotExistsException;
    Article createArticle(ArticleDTO articleDTO) throws ArticleAlreadyExistsException;
    Article getArticleBySlug(String slug) throws ArticleDoNotExistsException;
    Article getArticleById(Long id) throws ArticleDoNotExistsException;
    Article getArticleByTitle(String title) throws ArticleDoNotExistsException;
    Article updateArticle(Long articleId, ArticleDTO newArticleDTO);
    void deleteArticle(Long id) throws ArticleDoNotExistsException;

    //Operations related with User and Tags

    //returns Users that have this articleId as favorite
    Set<User> getFavsForArticle(Long articleId) throws ArticleDoNotExistsException;
    //Set a new favorite article for a user
    Article setFavsForUser(Long articleId, String username) throws ArticleDoNotExistsException, UserNotFoundException;
    //Get all favorite articles of a given user
    List<Article> getFavsByUser(String username) throws UserNotFoundException;
    List<Article> getArticlesByTag();


}
