package com.duvi.blogservice.controller;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.duvi.blogservice.config.security.TokenService;
import com.duvi.blogservice.model.Tag;
import com.duvi.blogservice.model.dto.*;
import com.duvi.blogservice.model.exceptions.*;
import com.duvi.blogservice.service.*;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/articles")
public class BlogController {

    private ArticleService articleService;
    private TagService tagService;
    private CommentService commentService;
    private TokenService tokenService;
    private UserService userService;
    private EmailService emailService;


    public BlogController(ArticleService articleService,
                          TagService tagService,
                          CommentService commentService,
                          TokenService tokenService,
                          UserService userService,
                          EmailService emailService) {

        this.articleService = articleService;
        this.tagService = tagService;
        this.commentService = commentService;
        this.tokenService = tokenService;
        this.userService = userService;
        this.emailService = emailService;
    }

    //Basic CRUD
    @GetMapping("/global")
    public ResponseEntity<ArticlesResponseDTO> getAllArticles(
            @RequestParam(required = false) Integer limit,
            @RequestParam(required = false) Integer offset,
            @RequestHeader HttpHeaders headers)   {

        String token = headers.getFirst("Authorization");
        String loggedUsername;
        List<ArticleResponseDTO> articleList = articleService.getArticlesSorted();
        Long articlesCount = (long) articleList.size();
        ArticlesResponseDTO articleResponse;

        //if there is loggedUser, get favs
        if (token != null ) {
            token = token.replace("Bearer ","");
            loggedUsername = tokenService.validateToken(token);
            articleList = articleList.stream().map( article ->
                    article.withFav(articleService.checkFav(article.id(), loggedUsername))
            ).toList();
        } else {
            loggedUsername = "";
        }

        //if there is offset, the lists of articles is shorter
        if (limit != null && offset != null) {
            Integer initOffset = offset*limit;
            Integer endOffset = initOffset + limit;
            articleList = articleList.subList(initOffset, endOffset);
        }

        //All userDTO's are created with 'isFollowing' field as false by default,
        //so we find out if the current loggedUser is following the author of the article
        articleList = articleList.stream().map(
                article ->
                        article.withAuthor(article.author().withFollowing(userService.isFollowing(article.author().id(), loggedUsername)))
        ).toList();

        articleResponse = new ArticlesResponseDTO(articleList, articlesCount);
        return new ResponseEntity<>(articleResponse, HttpStatus.OK);
    }

    @GetMapping("/feed")
    public ResponseEntity<ArticlesResponseDTO> getFeedArticles(
            @RequestParam(required = false) Integer limit,
            @RequestParam(required = false) Integer offset,
            @RequestHeader HttpHeaders headers) throws EntityDoesNotExistsException {

        //if there is loggedUser, we get favs
        String token = headers.getFirst("Authorization");
        String loggedUsername;
        ArticlesResponseDTO response;
        List<ArticleResponseDTO> articleList = articleService.getArticles();
        Long articlesCount = (long) articleList.size();

        if (token != null) {
            token = token.replace("Bearer ", "");
            loggedUsername = tokenService.validateToken(token);
            articleList = articleList.stream().map( article ->
                    article.withFav(articleService.checkFav(article.id(), loggedUsername))
            ).toList();
        } else {
            loggedUsername = "";
        }

        if (limit != null && offset != null) {
            Integer initOffset = offset*limit;
            Integer endOffset = initOffset + limit;
            articleList = articleList.subList(initOffset, endOffset);
        }

        articleList = articleList.stream().map(
                article ->
                        article.withAuthor(article.author().withFollowing(userService.isFollowing(article.author().id(), loggedUsername)))
        ).toList();

        response = new ArticlesResponseDTO(articleList, articlesCount);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping("/global")
    public ResponseEntity<ArticleResponseDTO> createArticle(@RequestBody SetArticleDTO createArticleDTO) throws EntityAlreadyExistsException, EntityDoesNotExistsException {
        ArticleResponseDTO article = articleService.createArticle(createArticleDTO);
        return new ResponseEntity<>(article, HttpStatus.CREATED);
    }
    //Upload Background Image of article
    @PostMapping(value = "/images/{articleSlug}", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<String> uploadBackgroundImage(@RequestParam("file") MultipartFile file, @PathVariable String articleSlug) throws ImageException {
        String uploadMessage = articleService.uploadBackgroundImage(file, articleSlug);
        return new ResponseEntity<>(uploadMessage, HttpStatus.CREATED);
    }
    //Get Background Image of article
    @GetMapping("/images/{articleSlug}")
    public ResponseEntity<String> getBackgroundImage(@PathVariable String articleSlug ) {
        String imageUrl = articleService.getBackgroundImage(articleSlug);
        return new ResponseEntity<>(imageUrl, HttpStatus.CREATED);
    }
    @GetMapping("/slug/{articleSlug}")
    public ResponseEntity<ArticleResponseDTO> getArticleBySlug(@PathVariable String articleSlug, @RequestHeader HttpHeaders headers) throws EntityDoesNotExistsException {
        String token = headers.getFirst("Authorization");
        String loggedUsername;
        if (token != null ) {
            token = token.replace("Bearer ","");
            loggedUsername = tokenService.validateToken(token);
        } else {
            loggedUsername = "";
        }
        ArticleResponseDTO articleResponseDTO = articleService.getArticleBySlug(articleSlug);
        articleResponseDTO = articleResponseDTO.withAuthor(articleResponseDTO.author().withFollowing(userService.isFollowing(articleResponseDTO.author().id(), loggedUsername)));
        return new ResponseEntity<>(articleResponseDTO, HttpStatus.OK);
    }

    @PutMapping("/slug/{articleSlug}")
    public ResponseEntity<ArticleResponseDTO> editArticle(@PathVariable String articleSlug, @RequestBody SetArticleDTO setArticleDTO) throws EntityDoesNotExistsException {
        return new ResponseEntity<>(articleService.updateArticleBySlug(articleSlug, setArticleDTO), HttpStatus.OK);
    }

    @DeleteMapping("/slug/{articleSlug}")
    public ResponseEntity<String> deleteArticleBySlug(@PathVariable String articleSlug) throws EntityDoesNotExistsException {
        articleService.deleteArticleBySlug(articleSlug);
        return new ResponseEntity<>("Article with slug %s successfully deleted".formatted(articleSlug), HttpStatus.OK);
    }

    //Operations with Author
    @GetMapping("/author/{username}")
    public ResponseEntity<ArticlesResponseDTO> getArticlesFromAuthor(@PathVariable String username, @RequestParam(required = false) Integer limit, @RequestParam(required = false) Integer offset, @RequestHeader HttpHeaders headers) throws EntityDoesNotExistsException {
        String token = headers.getFirst("Authorization");
        String loggedUsername;
        if (token != null ) {
            token = token.replace("Bearer ","");
            loggedUsername = tokenService.validateToken(token);
        } else {
            loggedUsername = "";
        }

        List<ArticleResponseDTO> articleResponseDTOS = articleService.getByAuthor(username);
        ArticlesResponseDTO response;
        Long count = (long) articleResponseDTOS.size();
        if (limit != null && offset != null) {
            Integer initOffset = offset*limit;
            Integer endOffset = initOffset + limit;
            articleResponseDTOS = articleResponseDTOS.subList(initOffset, endOffset);
        }

        articleResponseDTOS = articleResponseDTOS.stream().map(article ->
                article.withAuthor(article.author().withFollowing(userService.isFollowing(article.author().id(), loggedUsername)))
        ).toList();
        response = new ArticlesResponseDTO(articleResponseDTOS, count);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }


    //Operations with Users
    @GetMapping("/favs/{slug}")
    public ResponseEntity<List<UserResponseDTO>> getFavsForArticle(@PathVariable String slug ) throws EntityDoesNotExistsException {
        List<UserResponseDTO> favUsers = articleService.getFavUsers(slug);
        return new ResponseEntity<>(favUsers, HttpStatus.OK);
    }

    @PostMapping("/favs/{slug}")
    public ResponseEntity<ArticleResponseDTO> setFavsForUser(@PathVariable String slug, @RequestHeader HttpHeaders headers) throws EntityDoesNotExistsException, EntityDoesNotExistsException {
        String token = headers.getFirst("Authorization").replace("Bearer ", "");
        String username = tokenService.validateToken(token);
        ArticleResponseDTO article = articleService.setFavorite(slug, username);
        return new ResponseEntity<>(article, HttpStatus.OK);
    }
    @DeleteMapping("/favs/{slug}")
    public ResponseEntity<ArticleResponseDTO> removeFavsForUser(@PathVariable String slug, @RequestHeader HttpHeaders headers) throws EntityDoesNotExistsException, EntityDoesNotExistsException {
        String token = headers.getFirst("Authorization").replace("Bearer ", "");
        String username = tokenService.validateToken(token);
        ArticleResponseDTO article = articleService.removeFavorite(slug, username);
        return new ResponseEntity<>(article, HttpStatus.OK);
    }

    @GetMapping("/favs/users/{username}")
    public  ResponseEntity<ArticlesResponseDTO> getFavsForUser(@PathVariable String username, @RequestParam(required = false) Integer limit, @RequestParam(required = false) Integer offset, @RequestHeader HttpHeaders headers) throws EntityDoesNotExistsException {

        List<ArticleResponseDTO> articleResponseDTOS = articleService.getFavArticles(username);
        Long count = (long) articleResponseDTOS.size();
        ArticlesResponseDTO response;
        String token = headers.getFirst("Authorization");
        String loggedUsername;
        if (token != null ) {
            token = token.replace("Bearer ","");
            loggedUsername = tokenService.validateToken(token);
        } else {
            loggedUsername = "";
        }

        if (limit != null && offset != null ) {
            Integer initOffset = offset*limit;
            Integer endOffset = initOffset + limit;
            articleResponseDTOS = articleResponseDTOS.subList(initOffset, endOffset > articleResponseDTOS.size() ? articleResponseDTOS.size() : endOffset);
        }
        articleResponseDTOS = articleResponseDTOS.stream().map(article ->
                article.withAuthor(article.author().withFollowing(userService.isFollowing(article.author().id(), loggedUsername)))
        ).toList();
        response = new ArticlesResponseDTO(articleResponseDTOS, count);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    @GetMapping("/favs/users/logged")
    public ResponseEntity<ArticlesResponseDTO> getFavsOfLoggedUser(@RequestHeader HttpHeaders headers) throws EntityDoesNotExistsException {

        String token = headers.getFirst("Authorization");
        String loggedUsername;
        if (token != null ) {
            token = token.replace("Bearer ","");
            loggedUsername = tokenService.validateToken(token);
        } else {
            loggedUsername = "";
        }
        List<ArticleResponseDTO> articleResponseDTOS = articleService.getFavArticles(loggedUsername);
        Long count = (long) articleResponseDTOS.size();
        ArticlesResponseDTO response;

        articleResponseDTOS = articleResponseDTOS.stream().map(article ->
                article.withAuthor(article.author().withFollowing(userService.isFollowing(article.author().id(), loggedUsername)))
        ).toList();

        response = new ArticlesResponseDTO(articleResponseDTOS, count);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    //Operations with Tags
    @GetMapping("/tags")
    public  ResponseEntity<ArticlesResponseDTO> getArticlesByTag(@RequestParam(required = true) String tag, @RequestParam(required = false) Integer limit, @RequestParam(required = false) Integer offset, @RequestHeader HttpHeaders headers) throws TagNotFoundException {
        ArticlesResponseDTO response;
        List<ArticleResponseDTO> articleResponseDTOS = articleService.getArticlesByTag(tag);
        Long count = (long) articleResponseDTOS.size();
        String token = headers.getFirst("Authorization");
        String loggedUsername;
        if (token != null ) {
            token = token.replace("Bearer ","");
            loggedUsername = tokenService.validateToken(token);
        } else {
            loggedUsername = "";
        }
        if (limit != null && offset != null) {
            Integer initOffset = offset*limit;
            Integer endOffset = initOffset + limit;
            articleResponseDTOS = articleResponseDTOS.subList(initOffset, endOffset);
        }
        articleResponseDTOS = articleResponseDTOS.stream().map(article ->
                article.withAuthor(article.author().withFollowing(userService.isFollowing(article.author().id(), loggedUsername)))
        ).toList();
        response = new ArticlesResponseDTO(articleResponseDTOS, count);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/global/tags")
    public ResponseEntity<List<Tag>> getAllTags() {
        List<Tag> tags = tagService.getAllTags();
        return new ResponseEntity<>(tags, HttpStatus.OK);

    }
    @GetMapping("/tags/{slug}")
    public ResponseEntity<List<Tag>> getTagsOf(@PathVariable String slug) throws EntityDoesNotExistsException {
        List<Tag> tags = articleService.getTagsOf(slug);
        return new ResponseEntity<>(tags, HttpStatus.OK);

    }
    @PostMapping("/tags")
    public ResponseEntity<ArticleResponseDTO> setTagFor(@RequestParam(required = true) String slug, @RequestParam(required = true) String tag) throws EntityDoesNotExistsException {
        ArticleResponseDTO article = articleService.setTag(slug, tag);
        return new ResponseEntity<>(article, HttpStatus.OK);
    }
    @DeleteMapping("/tags")
    public ResponseEntity<ArticleResponseDTO> removeTagFor(@RequestParam(required = true) String slug, @RequestParam(required = true) String tag) throws EntityDoesNotExistsException {
        ArticleResponseDTO article = articleService.removeTag(slug, tag);
        return new ResponseEntity<>(article, HttpStatus.OK);
    }

    //Operations with Comments

    @GetMapping("/comments")
    public ResponseEntity<CommentResponseDTO> getCommentsOfArticle(@RequestParam(required = true) String slug) throws EntityDoesNotExistsException {
        List<CommentDTO> comments = commentService.getCommentOfArticle(slug);
        Long commentsCount = (long) comments.size();
        CommentResponseDTO commentResponseDTO = new CommentResponseDTO(comments, commentsCount);
        return new ResponseEntity<>(commentResponseDTO, HttpStatus.OK);

    }
    @PostMapping("/comments")
    public ResponseEntity<CommentResponseDTO> postComment(@RequestBody SetCommentDTO commentDTO, @RequestParam(required = true) String slug, @RequestHeader HttpHeaders headers) throws EntityDoesNotExistsException, EntityDoesNotExistsException {
        String token = headers.getFirst("Authorization").replace("Bearer ", "");
        String username = tokenService.validateToken(token);
        CommentDTO comment = commentService.createComment(commentDTO.body(), username, slug);
        List<CommentDTO> comments = commentService.getCommentOfArticle(slug);
        Long commentsCount = (long) comments.size();
        CommentResponseDTO commentResponseDTO = new CommentResponseDTO(comments, commentsCount);
        return new ResponseEntity<>(commentResponseDTO, HttpStatus.OK);
    }
    @PutMapping("/comments/{commentId}")
    public ResponseEntity<CommentResponseDTO> editComment(@PathVariable Long commentId, @RequestBody SetCommentDTO commentDTO, @RequestParam(required = true) String slug, @RequestHeader HttpHeaders headers) throws EntityDoesNotExistsException {
        CommentDTO comment = commentService.updateComment(commentId, commentDTO);
        List<CommentDTO> comments = commentService.getCommentOfArticle(slug);
        Long commentsCount = (long) comments.size();
        CommentResponseDTO commentResponseDTO = new CommentResponseDTO(comments, commentsCount);
        return new ResponseEntity<>(commentResponseDTO, HttpStatus.OK);
    }
    @DeleteMapping("/comments/{commentId}")
    public ResponseEntity<CommentResponseDTO> deleteComment(@PathVariable Long commentId, @RequestParam(required = true) String slug, @RequestHeader HttpHeaders headers) throws EntityDoesNotExistsException, CommentNotFoundException {
        commentService.deleteComment(commentId);
        List<CommentDTO> comments = commentService.getCommentOfArticle(slug);
        Long commentsCount = (long) comments.size();
        CommentResponseDTO commentResponseDTO = new CommentResponseDTO(comments, commentsCount);
        return new ResponseEntity<>(commentResponseDTO, HttpStatus.OK);
    }

    @PostMapping("/email")
    public ResponseEntity<String> sendEmail(@RequestBody EmailDTO emailDTO) throws MessagingException {
        emailService.sendGreetingEmail(emailDTO.to());
        return new ResponseEntity<>("Email Sent!!", HttpStatus.OK);
    }
}
