package com.duvi.blogservice.service;

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
import jakarta.annotation.Nullable;
import jakarta.validation.constraints.Null;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

@Service
public interface ArticleService {

    //createDTO
    ArticleDTO createDTO(Article article);

    //checkFav

    Boolean checkFav(Long articleId, String loggedUsername);

    //Basic CRUD Operations
    List<ArticleDTO> getArticlesSorted();
    List<ArticleDTO> getArticles() ;
    ArticleDTO createArticle(SetArticleDTO articleDTO) throws ArticleAlreadyExistsException, ArticleDoNotExistsException;
    ArticleDTO getArticleBySlug(String slug) throws ArticleDoNotExistsException;
    ArticleDTO getArticleById(Long id) throws ArticleDoNotExistsException;
    ArticleDTO getArticleByTitle(String title) throws ArticleDoNotExistsException;
    ArticleDTO updateArticle(Long articleId, SetArticleDTO newArticleDTO) throws ArticleDoNotExistsException;
    void deleteArticle(Long id) throws ArticleDoNotExistsException;
    ArticleDTO updateArticleBySlug(String articleSlug, SetArticleDTO newArticleDTO) throws ArticleDoNotExistsException;
    void deleteArticleBySlug(String articleSlug) throws ArticleDoNotExistsException;

    //Operations related with Author
    List<ArticleDTO> getByAuthor(String username) throws UserNotFoundException;

    //Operations related with User
        //Get all the users that marked a given article as favorite
    List<UserDTO> getFavUsers(String slug) throws ArticleDoNotExistsException;
        //Set a new favorite article for a user
    ArticleDTO setFavorite(String slug, String username) throws ArticleDoNotExistsException, UserNotFoundException;
        //Remove favorite article for a user
    ArticleDTO removeFavorite(String slug, String username) throws ArticleDoNotExistsException, UserNotFoundException;

    boolean isFavorite(String slug, String username) throws ArticleDoNotExistsException;

        //Get all favorite articles of a given user
    List<ArticleDTO> getFavArticles(String username) throws UserNotFoundException;

    //Operations related with Tags
    List<ArticleDTO> getArticlesByTag(String tagName) throws TagNotFoundException;
    List<Tag> getTagsOf(String slug);
    ArticleDTO setTag(String slug, String tagName) throws ArticleDoNotExistsException;
    ArticleDTO removeTag(String slug, String tagName) throws ArticleDoNotExistsException;




}
