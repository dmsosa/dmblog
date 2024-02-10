package com.duvi.blogservice.controller;

import com.duvi.blogservice.model.Article;
import com.duvi.blogservice.model.Comment;
import com.duvi.blogservice.model.Tag;
import com.duvi.blogservice.model.User;
import com.duvi.blogservice.model.dto.ArticleDTO;
import com.duvi.blogservice.model.dto.ArticlesResponseDTO;
import com.duvi.blogservice.model.dto.UserDTO;
import com.duvi.blogservice.model.exceptions.ArticleAlreadyExistsException;
import com.duvi.blogservice.model.exceptions.ArticleDoNotExistsException;
import com.duvi.blogservice.model.exceptions.TagNotFoundException;
import com.duvi.blogservice.model.exceptions.UserNotFoundException;
import com.duvi.blogservice.service.ArticleService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/api/articles")
public class ArticleController {






    private ArticleService articleService;

    public ArticleController(ArticleService articleService) {
        this.articleService = articleService;
    }

    //Basic CRUD
    @GetMapping("/global")
    public ResponseEntity<ArticlesResponseDTO> getAllArticles(@RequestParam(required = false) Integer limit, @RequestParam(required = false) Integer offset) throws ArticleDoNotExistsException {
        List<ArticleDTO> articleList = articleService.getArticles();
        Long articlesCount = (long) articleList.size();

        if (limit != null && offset != null) {
            Integer initOffset = offset*limit;
            Integer endOffset = initOffset + limit;
            List<ArticleDTO> subList = articleList.subList(initOffset, endOffset);
            ArticlesResponseDTO articleResponse = new ArticlesResponseDTO(subList, articlesCount);
            return new ResponseEntity<>(articleResponse, HttpStatus.OK);
        }
        ArticlesResponseDTO articleResponse = new ArticlesResponseDTO(articleList, articlesCount);
        return new ResponseEntity<>(articleResponse, HttpStatus.OK);
    }
    @PostMapping("/global")
    public ResponseEntity<ArticleDTO> createArticle(@RequestBody ArticleDTO articleDTO) throws ArticleAlreadyExistsException {
        ArticleDTO article = articleService.createArticle(articleDTO);
        return new ResponseEntity<>(article, HttpStatus.CREATED);
    }
    @GetMapping("/{articleSlug}")
    public ResponseEntity<ArticleDTO> getArticleBySlug(@PathVariable String articleSlug) throws ArticleDoNotExistsException {
        return new ResponseEntity<>(articleService.getArticleBySlug(articleSlug), HttpStatus.OK);
    }

    @PutMapping("/{articleSlug}")
    public ResponseEntity<ArticleDTO> editArticle(@PathVariable String articleSlug, @RequestBody ArticleDTO articleDTO) {
        return new ResponseEntity<>(articleService.updateArticleBySlug(articleSlug, articleDTO), HttpStatus.OK);
    }

    @DeleteMapping("/{articleSlug}")
    public ResponseEntity<String> deleteArticleBySlug(@PathVariable String articleSlug) throws ArticleDoNotExistsException {
        articleService.deleteArticleBySlug(articleSlug);
        return new ResponseEntity<>("Article with slug %s successfully deleted".formatted(articleSlug), HttpStatus.OK);
    }

    //Operations with Author
    @GetMapping("/author/{username}")
    public ResponseEntity<List<ArticleDTO>> getArticlesFromAuthor(@PathVariable String username) throws UserNotFoundException {
        List<ArticleDTO> articleDTOS = articleService.getByAuthor(username);
        return new ResponseEntity<>(articleDTOS, HttpStatus.OK);
    }
    //Operations with Users
    @GetMapping("/favs")
    public ResponseEntity<List<UserDTO>> getFavsForArticle(@RequestParam(required = true, name = "slug") String slug ) throws ArticleDoNotExistsException {
        List<UserDTO> favUsers = articleService.getFavUsers(slug);
        return new ResponseEntity<>(favUsers, HttpStatus.OK);
    }

    @PostMapping("/favs")
    public ResponseEntity<String> setFavsForUser(@RequestParam(required = true) String slug, @RequestParam(required = true) String username) throws ArticleDoNotExistsException, UserNotFoundException {
        articleService.setFavorite(slug, username);
        return new ResponseEntity<>("%1$s marked article %2$s as favorite!".formatted(username, slug), HttpStatus.OK);
    }
    @DeleteMapping("/favs")
    public ResponseEntity<String> removeFavsForUser(@RequestParam(required = true) String slug, @RequestParam(required = true) String username) throws ArticleDoNotExistsException, UserNotFoundException {
        articleService.removeFavorite(slug, username);
        return new ResponseEntity<>("%2$s is no longer one of the favorites of %1$s".formatted(username, slug), HttpStatus.OK);
    }

    @GetMapping("/favs/{username}")
    public  ResponseEntity<List<ArticleDTO>> getFavsForUser(@PathVariable String username) throws UserNotFoundException {
        return new ResponseEntity<>(articleService.getFavArticles(username), HttpStatus.OK);
    }
    //Operations with Tags
    @GetMapping("/tags/{tagName}")
    public  ResponseEntity<List<ArticleDTO>> getArticlesByTag(@PathVariable String tagName) throws TagNotFoundException {
        List<ArticleDTO> articleDTOS = articleService.getArticlesByTag(tagName);
        return new ResponseEntity<>(articleDTOS, HttpStatus.OK);
    }

    @GetMapping("/tags")
    public ResponseEntity<List<Tag>> getTagsOf(@RequestParam(required = true) String slug) throws ArticleDoNotExistsException {
        List<Tag> tags = articleService.getTagsOf(slug);
        return new ResponseEntity<>(tags, HttpStatus.OK);

    }
    @PostMapping("/tags")
    public ResponseEntity<String> setTagFor(@RequestParam(required = true) String slug, @RequestParam(required = true) String tag) throws ArticleDoNotExistsException {
        articleService.setTag(slug, tag);
        return new ResponseEntity<>("tag %2$s added to article %1$s".formatted(slug, tag), HttpStatus.OK);
    }
    @DeleteMapping("/tags")
    public ResponseEntity<String> removeTagFor(@RequestParam(required = true) String slug, @RequestParam(required = true) String tag) throws ArticleDoNotExistsException {
        articleService.removeTag(slug, tag);
        return new ResponseEntity<>("tag %2$s removed from article %1$s".formatted(slug, tag), HttpStatus.OK);
    }

    @GetMapping("/comments")
    public ResponseEntity<List<Comment>> getCommentsOf(@RequestParam(required = true) String slug) throws ArticleDoNotExistsException {
        List<Comment> comments = articleService.getCommentsOf(slug);
        return new ResponseEntity<>(comments, HttpStatus.OK);

    }

}
