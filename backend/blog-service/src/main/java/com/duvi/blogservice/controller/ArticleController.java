package com.duvi.blogservice.controller;

import com.duvi.blogservice.model.Article;
import com.duvi.blogservice.model.User;
import com.duvi.blogservice.model.dto.ArticleDTO;
import com.duvi.blogservice.model.dto.ArticleResponseDTO;
import com.duvi.blogservice.model.exceptions.ArticleAlreadyExistsException;
import com.duvi.blogservice.model.exceptions.ArticleDoNotExistsException;
import com.duvi.blogservice.model.exceptions.UserNotFoundException;
import com.duvi.blogservice.service.ArticleService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;
import java.util.Set;
import java.util.stream.Stream;

@RestController
@RequestMapping("/api/articles")
public class ArticleController {

//    //CRUD
//    articles/global get, post
//    articles/global?slug&id&title get, put, delete;
//    //for tags
//    articles/{id}/tags/ get all tags of an article, post a tag
//    articles/{id}/tags/{tagName} put to edit tag, delete
//    //for favs
//    articles/favs?slug= get all favorited Users
//    articles/favs?slug=&username=? post fav for user, delete fav for user
//    articles/favs?username=? get favs from user
//    //for author
//    articles/author/{username} get all arts from author




    private ArticleService articleService;

    public ArticleController(ArticleService articleService) {
        this.articleService = articleService;
    }
    @GetMapping("/global")
    public ResponseEntity<ArticleResponseDTO> getAllArticles(@RequestParam(required = false) Integer limit, @RequestParam(required = false) Integer offset) throws ArticleDoNotExistsException {
        List<Article> articleList = articleService.getArticles();
        Long articlesCount = (long) articleList.size();

        if (limit != null && offset != null) {
            Integer initOffset = offset*limit;
            Integer endOffset = initOffset + limit;
            List<Article> subList = articleList.subList(initOffset, endOffset);
            ArticleResponseDTO articleResponse = new ArticleResponseDTO(subList, articlesCount);
            return new ResponseEntity<>(articleResponse, HttpStatus.OK);
        }
        ArticleResponseDTO articleResponse = new ArticleResponseDTO(articleList, articlesCount);
        return new ResponseEntity<>(articleResponse, HttpStatus.OK);
    }
    @PostMapping("/")
    public ResponseEntity<Article> createArticle(@RequestBody ArticleDTO articleDTO) throws ArticleAlreadyExistsException {
        Article article = articleService.createArticle(articleDTO);
        return new ResponseEntity<>(article, HttpStatus.CREATED);
    }
    @GetMapping("/{articleSlug}")
    public ResponseEntity<Article> getArticleBySlug(@PathVariable String articleSlug) throws ArticleDoNotExistsException {
        return new ResponseEntity<>(articleService.getArticleBySlug(articleSlug), HttpStatus.OK);
    }


    @GetMapping("/favs")
    public ResponseEntity<Set<User>> getFavsForArticle(@RequestParam(required = true) Long id ) throws ArticleDoNotExistsException {
        Set<User> favUsers = articleService.getFavsForArticle(id);
        return new ResponseEntity<>(favUsers, HttpStatus.OK);
    }
    @GetMapping("/favs/{username}")
    public  ResponseEntity<List<Article>> getFavsForUser(@PathVariable String username) throws UserNotFoundException {
        return new ResponseEntity<>(articleService.getFavsByUser(username), HttpStatus.OK);
    }

    @PostMapping("/favs")
    public ResponseEntity<Article> setFavsForUser(@RequestParam(required = true) Long id, @RequestParam(required = true) String username) throws ArticleDoNotExistsException, UserNotFoundException {
        Article article = articleService.setFavsForUser(id, username);
        return new ResponseEntity<>(article, HttpStatus.OK);
    }

    @GetMapping("/tags/{tagName}")
    public  ResponseEntity<List<Article>> getArticlesByTag(@PathVariable String tagName) {
        return new ResponseEntity<>(articleService.getArticlesByTag(tagName), HttpStatus.OK);
    }




//    @PostMapping("/")
//    public ResponseEntity<Article> postArticle() {
//
//    }

}
