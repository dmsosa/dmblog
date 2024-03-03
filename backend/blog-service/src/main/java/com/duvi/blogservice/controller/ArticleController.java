package com.duvi.blogservice.controller;

import com.duvi.blogservice.config.security.TokenService;
import com.duvi.blogservice.model.Tag;
import com.duvi.blogservice.model.User;
import com.duvi.blogservice.model.dto.*;
import com.duvi.blogservice.model.exceptions.ArticleAlreadyExistsException;
import com.duvi.blogservice.model.exceptions.ArticleDoNotExistsException;
import com.duvi.blogservice.model.exceptions.TagNotFoundException;
import com.duvi.blogservice.model.exceptions.UserNotFoundException;
import com.duvi.blogservice.repository.UserRepository;
import com.duvi.blogservice.service.ArticleService;
import com.duvi.blogservice.service.CommentService;
import com.duvi.blogservice.service.TagService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/articles")
public class ArticleController {






    private ArticleService articleService;
    private TagService tagService;
    private CommentService commentService;
    private TokenService tokenService;
    private UserRepository userRepository;


    public ArticleController(ArticleService articleService, TagService tagService, CommentService commentService, TokenService tokenService, UserRepository userRepository) {

        this.articleService = articleService;
        this.tagService = tagService;
        this.commentService = commentService;
        this.tokenService = tokenService;
        this.userRepository = userRepository;
    }

    //Basic CRUD
    @GetMapping("/global")
    public ResponseEntity<ArticlesResponseDTO> getAllArticles(
            @RequestParam(required = false) Integer limit,
            @RequestParam(required = false) Integer offset,
            @RequestHeader HttpHeaders headers) throws ArticleDoNotExistsException {


        List<ArticleDTO> articleList = articleService.getArticles();

        //if there is loggedUser, get favs
        String token = headers.getFirst("Authorization");
        if (token != null ) {
            token = token.replace("Bearer ","");
            String loggedUsername = tokenService.validateToken(token);
            articleList = articleList.stream().map( article ->
                    article.withFav(articleService.checkFav(article.id(), loggedUsername))
            ).toList();
        }

        Long articlesCount = (long) articleList.size();

        //if there is offset
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

    @GetMapping("/feed")
    public ResponseEntity<ArticlesResponseDTO> getFeedArticles(
            @RequestParam(required = false) Integer limit,
            @RequestParam(required = false) Integer offset,
            @RequestHeader HttpHeaders headers) throws ArticleDoNotExistsException {

        //if there is loggedUser, we get favs
        String token = headers.getFirst("Authorization");
        List<ArticleDTO> articleList = articleService.getArticles();
        if (token != null) {
            token = token.replace("Bearer ", "");
            String loggedUsername = tokenService.validateToken(token);
            articleList = articleList.stream().map( article ->
                    article.withFav(articleService.checkFav(article.id(), loggedUsername))
            ).toList();
        }

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
    public ResponseEntity<ArticleDTO> createArticle(@RequestBody SetArticleDTO createArticleDTO, @RequestHeader HttpHeaders headers) throws ArticleAlreadyExistsException, ArticleDoNotExistsException {

        String token = headers.getFirst("Authorization").replace("Bearer ", "");
        String username = tokenService.validateToken(token);
        User user = userRepository.findByUsername(username).get();

        ArticleDTO article = articleService.createArticle(createArticleDTO);

        return new ResponseEntity<>(article, HttpStatus.CREATED);
    }
    @GetMapping("/slug/{articleSlug}")
    public ResponseEntity<ArticleDTO> getArticleBySlug(@PathVariable String articleSlug) throws ArticleDoNotExistsException {
        return new ResponseEntity<>(articleService.getArticleBySlug(articleSlug), HttpStatus.OK);
    }

    @PutMapping("/slug/{articleSlug}")
    public ResponseEntity<ArticleDTO> editArticle(@PathVariable String articleSlug, @RequestBody SetArticleDTO setArticleDTO) throws ArticleDoNotExistsException {
        return new ResponseEntity<>(articleService.updateArticleBySlug(articleSlug, setArticleDTO), HttpStatus.OK);
    }

    @DeleteMapping("/slug/{articleSlug}")
    public ResponseEntity<String> deleteArticleBySlug(@PathVariable String articleSlug) throws ArticleDoNotExistsException {
        articleService.deleteArticleBySlug(articleSlug);
        return new ResponseEntity<>("Article with slug %s successfully deleted".formatted(articleSlug), HttpStatus.OK);
    }

    //Operations with Author
    @GetMapping("/author/{username}")
    public ResponseEntity<ArticlesResponseDTO> getArticlesFromAuthor(@PathVariable String username, @RequestParam(required = false) Integer limit, @RequestParam(required = false) Integer offset) throws UserNotFoundException {
        List<ArticleDTO> articleDTOS = articleService.getByAuthor(username);
        Long count = (long) articleDTOS.size();
        if (limit != null && offset != null) {
            Integer initOffset = offset*limit;
            Integer endOffset = initOffset + limit;
            List<ArticleDTO> articleList = articleDTOS.subList(initOffset, endOffset);
            ArticlesResponseDTO response = new ArticlesResponseDTO(articleList, count);
            return new ResponseEntity<>(response, HttpStatus.OK);
        }
        ArticlesResponseDTO response = new ArticlesResponseDTO(articleDTOS, count);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }


    //Operations with Users
    @GetMapping("/favs/{slug}")
    public ResponseEntity<List<UserDTO>> getFavsForArticle(@PathVariable String slug ) throws ArticleDoNotExistsException {
        List<UserDTO> favUsers = articleService.getFavUsers(slug);
        return new ResponseEntity<>(favUsers, HttpStatus.OK);
    }

    @PostMapping("/favs/{slug}")
    public ResponseEntity<ArticleDTO> setFavsForUser(@PathVariable String slug, @RequestHeader HttpHeaders headers) throws ArticleDoNotExistsException, UserNotFoundException {
        String token = headers.getFirst("Authorization").replace("Bearer ", "");
        String username = tokenService.validateToken(token);
        ArticleDTO article = articleService.setFavorite(slug, username);
        return new ResponseEntity<>(article, HttpStatus.OK);
    }
    @DeleteMapping("/favs/{slug}")
    public ResponseEntity<ArticleDTO> removeFavsForUser(@PathVariable String slug, @RequestHeader HttpHeaders headers) throws ArticleDoNotExistsException, UserNotFoundException {
        String token = headers.getFirst("Authorization").replace("Bearer ", "");
        String username = tokenService.validateToken(token);
        ArticleDTO article = articleService.removeFavorite(slug, username);
        return new ResponseEntity<>(article, HttpStatus.OK);
    }

    @GetMapping("/favs/users/{username}")
    public  ResponseEntity<ArticlesResponseDTO> getFavsForUser(@PathVariable String username, @RequestParam(required = false) Integer limit, @RequestParam(required = false) Integer offset) throws UserNotFoundException {
        List<ArticleDTO> articleDTOS = articleService.getFavArticles(username);
        Long count = (long) articleDTOS.size();
        if (limit != null && offset != null ) {
            Integer initOffset = offset*limit;
            Integer endOffset = initOffset + limit;

            List<ArticleDTO> articleList = articleDTOS.subList(initOffset, endOffset > articleDTOS.size() ? articleDTOS.size() : endOffset);
            ArticlesResponseDTO response = new ArticlesResponseDTO(articleList, count);
            return new ResponseEntity<>(response, HttpStatus.OK);
        }
        ArticlesResponseDTO response = new ArticlesResponseDTO(articleDTOS, count);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    @GetMapping("/favs/users/logged")
    public ResponseEntity<ArticlesResponseDTO> getFavsOfLoggedUser(@RequestHeader HttpHeaders headers) throws UserNotFoundException {
        String token = headers.getFirst("Authorization").replace("Bearer ", "");
        String username = tokenService.validateToken(token);
        List<ArticleDTO> articleDTOS = articleService.getFavArticles(username);
        Long count = (long) articleDTOS.size();
        ArticlesResponseDTO response = new ArticlesResponseDTO(articleDTOS, count);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    //Operations with Tags
    @GetMapping("/tags")
    public  ResponseEntity<ArticlesResponseDTO> getArticlesByTag(@RequestParam(required = true) String tag, @RequestParam(required = false) Integer limit, @RequestParam(required = false) Integer offset) throws TagNotFoundException {
        List<ArticleDTO> articleDTOS = articleService.getArticlesByTag(tag);
        Long count = (long) articleDTOS.size();
        if (limit != null && offset != null) {
            Integer initOffset = offset*limit;
            Integer endOffset = initOffset + limit;
            List<ArticleDTO> articleList = articleDTOS.subList(initOffset, endOffset);
            ArticlesResponseDTO response = new ArticlesResponseDTO(articleList, count);
            return new ResponseEntity<>(response, HttpStatus.OK);
        }
        ArticlesResponseDTO response = new ArticlesResponseDTO(articleDTOS, count);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/global/tags")
    public ResponseEntity<List<Tag>> getAllTags() {
        List<Tag> tags = tagService.getAllTags();
        return new ResponseEntity<>(tags, HttpStatus.OK);

    }
    @GetMapping("/tags/{slug}")
    public ResponseEntity<List<Tag>> getTagsOf(@PathVariable String slug) throws ArticleDoNotExistsException {
        List<Tag> tags = articleService.getTagsOf(slug);
        return new ResponseEntity<>(tags, HttpStatus.OK);

    }
    @PostMapping("/tags")
    public ResponseEntity<ArticleDTO> setTagFor(@RequestParam(required = true) String slug, @RequestParam(required = true) String tag) throws ArticleDoNotExistsException {
        ArticleDTO article = articleService.setTag(slug, tag);
        return new ResponseEntity<>(article, HttpStatus.OK);
    }
    @DeleteMapping("/tags")
    public ResponseEntity<ArticleDTO> removeTagFor(@RequestParam(required = true) String slug, @RequestParam(required = true) String tag) throws ArticleDoNotExistsException {
        ArticleDTO article = articleService.removeTag(slug, tag);
        return new ResponseEntity<>(article, HttpStatus.OK);
    }

    //Operations with Comments

    @GetMapping("/comments")
    public ResponseEntity<CommentResponseDTO> getCommentsOfArticle(@RequestParam(required = true) String slug) throws ArticleDoNotExistsException {
        List<CommentDTO> comments = commentService.getCommentOfArticle(slug);
        Long commentsCount = (long) comments.size();
        CommentResponseDTO commentResponseDTO = new CommentResponseDTO(comments, commentsCount);
        return new ResponseEntity<>(commentResponseDTO, HttpStatus.OK);

    }
    @PostMapping("/comments")
    public ResponseEntity<CommentResponseDTO> postComment(@RequestBody SetCommentDTO commentDTO, @RequestParam(required = true) String slug, @RequestHeader HttpHeaders headers) throws ArticleDoNotExistsException, UserNotFoundException {
        String token = headers.getFirst("Authorization").replace("Bearer ", "");
        String username = tokenService.validateToken(token);
        CommentDTO comment = commentService.createComment(commentDTO.body(), username, slug);
        List<CommentDTO> comments = commentService.getCommentOfArticle(slug);
        Long commentsCount = (long) comments.size();
        CommentResponseDTO commentResponseDTO = new CommentResponseDTO(comments, commentsCount);
        return new ResponseEntity<>(commentResponseDTO, HttpStatus.OK);

    }

}
