package com.duvi.blogservice.service;

import com.duvi.blogservice.model.Article;
import com.duvi.blogservice.model.Tag;
import com.duvi.blogservice.model.dto.ArticleDTO;
import com.duvi.blogservice.model.dto.SetArticleDTO;
import com.duvi.blogservice.model.dto.UserDTO;
import com.duvi.blogservice.model.exceptions.EntityAlreadyExistsException;
import com.duvi.blogservice.model.exceptions.EntityDoesNotExistsException;
import com.duvi.blogservice.model.exceptions.TagNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ArticleService {

    //createDTO
    ArticleDTO createDTO(Article article);

    //checkFav

    Boolean checkFav(Long articleId, String loggedUsername);

    //Basic CRUD Operations
    List<ArticleDTO> getArticlesSorted();
    List<ArticleDTO> getArticles() ;
    ArticleDTO createArticle(SetArticleDTO articleDTO) throws EntityAlreadyExistsException, EntityDoesNotExistsException;
    ArticleDTO getArticleBySlug(String slug) throws EntityDoesNotExistsException;
    ArticleDTO getArticleById(Long id) throws EntityDoesNotExistsException;
    ArticleDTO getArticleByTitle(String title) throws EntityDoesNotExistsException;
    ArticleDTO updateArticle(Long articleId, SetArticleDTO newArticleDTO) throws EntityDoesNotExistsException;
    void deleteArticle(Long id) throws EntityDoesNotExistsException;
    ArticleDTO updateArticleBySlug(String articleSlug, SetArticleDTO newArticleDTO) throws EntityDoesNotExistsException;
    void deleteArticleBySlug(String articleSlug) throws EntityDoesNotExistsException;

    //Operations related with Author
    List<ArticleDTO> getByAuthor(String username) throws EntityDoesNotExistsException;

    //Operations related with User
        //Get all the users that marked a given article as favorite
    List<UserDTO> getFavUsers(String slug) throws EntityDoesNotExistsException;
        //Set a new favorite article for a user
    ArticleDTO setFavorite(String slug, String username) throws EntityDoesNotExistsException, EntityDoesNotExistsException;
        //Remove favorite article for a user
    ArticleDTO removeFavorite(String slug, String username) throws EntityDoesNotExistsException, EntityDoesNotExistsException;

    boolean isFavorite(String slug, String username) throws EntityDoesNotExistsException;

        //Get all favorite articles of a given user
    List<ArticleDTO> getFavArticles(String username) throws EntityDoesNotExistsException;

    //Operations related with Tags
    List<ArticleDTO> getArticlesByTag(String tagName) throws TagNotFoundException;
    List<Tag> getTagsOf(String slug);
    ArticleDTO setTag(String slug, String tagName) throws EntityDoesNotExistsException;
    ArticleDTO removeTag(String slug, String tagName) throws EntityDoesNotExistsException;




}
