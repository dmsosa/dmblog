package com.duvi.blogservice.controller;

import com.duvi.blogservice.model.Article;
import com.duvi.blogservice.model.exceptions.ArticleDoNotExistsException;
import com.duvi.blogservice.service.ArticleService;
import org.flywaydb.core.Flyway;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Stream;

@RestController
@RequestMapping("/api/articles")
public class ArticleController {

    private ArticleService articleService;


    @GetMapping("/")
    public ResponseEntity<List<Article>> getAllArticles() throws ArticleDoNotExistsException {
        return new ResponseEntity<>(articleService.getArticles(), HttpStatus.OK);
    }

//    @PostMapping("/")
//    public ResponseEntity<Article> postArticle() {
//
//    }

}
