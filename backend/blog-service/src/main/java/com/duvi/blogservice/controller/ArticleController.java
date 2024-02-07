package com.duvi.blogservice.controller;

import com.duvi.blogservice.model.Article;
import com.duvi.blogservice.model.User;
import com.duvi.blogservice.model.dto.ArticleDTO;
import com.duvi.blogservice.model.exceptions.ArticleAlreadyExistsException;
import com.duvi.blogservice.model.exceptions.ArticleDoNotExistsException;
import com.duvi.blogservice.model.exceptions.UserNotFoundException;
import com.duvi.blogservice.service.ArticleService;
import org.flywaydb.core.Flyway;
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

    private ArticleService articleService;

    public ArticleController(ArticleService articleService) {
        this.articleService = articleService;
    }
    @GetMapping("/")
    public ResponseEntity<List<Article>> getAllArticles() throws ArticleDoNotExistsException {
        return new ResponseEntity<>(articleService.getArticles(), HttpStatus.OK);
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





//    @PostMapping("/")
//    public ResponseEntity<Article> postArticle() {
//
//    }

}
