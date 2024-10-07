package com.duvi.blogservice.controller;

import com.duvi.blogservice.config.security.TokenService;
import com.duvi.blogservice.model.Comment;
import com.duvi.blogservice.model.Tag;
import com.duvi.blogservice.model.User;
import com.duvi.blogservice.model.dto.*;
import com.duvi.blogservice.model.exceptions.*;
import com.duvi.blogservice.service.*;
import jakarta.mail.MessagingException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Objects;

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
    public ResponseEntity<ArticleListDTO> getAllArticles(
            @RequestParam(required = false) Integer limit,
            @RequestParam(required = false) Integer offset,
            Authentication authentication
    )   {


        List<ArticleResponseDTO> articleList = articleService.getArticlesSorted();
        Integer count = articleList.size();

        //if there is loggedUser, check favorite articles
        if (Objects.nonNull(authentication) && authentication.isAuthenticated()) {
            User loggedUser = (User) authentication.getPrincipal();
            //if loggedUser, check Fav articles
            articleList = articleList.stream().map( article ->
                    article.withFav(articleService.checkFav(article.id(), loggedUser.getUsername()))
            ).toList();


            //if loggedUser, check if following the author(s) of the article(s)
            articleList = articleList.stream().map(
                    article ->
                            article.withAuthor(article.author().withFollowing(userService.isFollowing(article.author().id(), loggedUser.getUsername())))
            ).toList();
        }

        //if there is offset, the lists of articles is shorter
        if (limit != null && offset != null) {
            Integer initOffset = offset*limit;
            Integer endOffset = initOffset + limit;
            if (endOffset > count) {
                articleList = articleList.subList(initOffset, count);
            } else {
                articleList = articleList.subList(initOffset, endOffset);
            }
        }

        return new ResponseEntity<>(new ArticleListDTO(count, articleList), HttpStatus.OK);
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ArticleResponseDTO> createArticle(
            @RequestParam("userId") Long userId,
            @RequestParam(name = "slug") String slug,
            @RequestParam(name = "title") String title,
            @RequestParam(name = "description") String description,
            @RequestParam(name = "body") String body,
            @RequestParam(name = "backgroundColor") String backgroundColor,
            @RequestParam(name = "fontColor") String fontColor,
            @RequestParam(name = "emoji") String emoji,
            @RequestParam(name = "tagList") List<String> tagList,
            @RequestParam(name = "image") MultipartFile image
    ) throws EntityAlreadyExistsException, EntityDoesNotExistsException {

        SetArticleDTO createArticleDTO = new SetArticleDTO(null, userId, slug, null, title, description, body, backgroundColor, fontColor, emoji, tagList, image);
        ArticleResponseDTO article = articleService.createArticle(createArticleDTO);
        return new ResponseEntity<>(article, HttpStatus.CREATED);
    }
    @GetMapping
    public ResponseEntity<ArticleResponseDTO> getArticle(@RequestParam(required = true) String slug, Authentication authentication) throws EntityDoesNotExistsException {
        ArticleResponseDTO articleResponseDTO = articleService.getArticleBySlug(slug);
        //if there is loggedUser, check favorite article
        if (Objects.nonNull(authentication) && authentication.isAuthenticated()) {
            User loggedUser = (User) authentication.getPrincipal();
            //if loggedUser, check Fav article
            articleResponseDTO = articleResponseDTO.withFav(articleService.checkFav(articleResponseDTO.id(), loggedUser.getUsername()));

            UserResponseDTO author = articleResponseDTO.author();
            articleResponseDTO = articleResponseDTO.withAuthor(author.withFollowing(userService.isFollowing(author.id(), loggedUser.getUsername())));
        }
        return new ResponseEntity<>(articleResponseDTO, HttpStatus.OK);
    }
    @PutMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> putArticle(
            @RequestParam("articleId") Long articleId,
            @RequestParam("userId") Long userId,
            @RequestParam(name = "slug") String slug,
            @RequestParam(name = "newSlug") String newSlug,
            @RequestParam(name = "title") String title,
            @RequestParam(name = "description") String description,
            @RequestParam(name = "body") String body,
            @RequestParam(name = "backgroundColor") String backgroundColor,
            @RequestParam(name = "fontColor") String fontColor,
            @RequestParam(name = "emoji") String emoji,
            @RequestParam(name = "tagList") List<String> tagList,
            @RequestParam(name = "image") MultipartFile image
    ) throws EntityDoesNotExistsException {
        SetArticleDTO newArticleDTO = new SetArticleDTO(articleId, userId, slug, newSlug, title, description, body, backgroundColor, fontColor, emoji, tagList, image);
        articleService.updateArticle(slug, newArticleDTO);
        return new ResponseEntity<>("Article with slug %s successfully deleted".formatted(slug), HttpStatus.OK);
    }
    @DeleteMapping
    public ResponseEntity<String> deleteArticle(@RequestParam(required = true) String slug) throws EntityDoesNotExistsException {
        articleService.deleteArticleBySlug(slug);
        return new ResponseEntity<>("Article with slug %s successfully deleted".formatted(slug), HttpStatus.OK);
    }

    //Operations with Author
    @GetMapping("/author")
    public ResponseEntity<ArticleListDTO> getArticlesFromAuthor(@RequestParam(required = true) String username, @RequestParam(required = false) Integer limit, @RequestParam(required = false) Integer offset, Authentication authentication) throws EntityDoesNotExistsException {
        List<ArticleResponseDTO> articleList = articleService.getByAuthor(username  );
        Integer count = articleList.size();

        //Crop the list into pieces of 3 by offset
        if (limit != null && offset != null) {
            Integer initOffset = offset*limit;
            Integer endOffset = initOffset + limit;
            if (endOffset > count) {
                articleList = articleList.subList(initOffset, count);
            } else {
                articleList = articleList.subList(initOffset, endOffset);
            }
        }

        //if there is loggedUser, check favorite articles
        if (Objects.nonNull(authentication) && authentication.isAuthenticated()) {
            User loggedUser = (User) authentication.getPrincipal();
            //if loggedUser, check Fav articles
            articleList = articleList.stream().map( article ->
                    article.withFav(articleService.checkFav(article.id(), loggedUser.getUsername()))
            ).toList();


            //if loggedUser, check if following the author(s) of the article(s)
            articleList = articleList.stream().map(
                    article ->
                            article.withAuthor(article.author().withFollowing(userService.isFollowing(article.author().id(), loggedUser.getUsername())))
            ).toList();
        }

        return new ResponseEntity<>(new ArticleListDTO(count, articleList), HttpStatus.OK);
    }



    //More operations with articles
    //Set backgroundColor
    @PostMapping("/edit")
    public ResponseEntity<ArticleResponseDTO> setField(
            @RequestParam(required = true) String slug,
            @RequestParam(required = true, name = "field") String property,
            @RequestParam(required = true, name = "value") String value) throws EntityDoesNotExistsException {
        switch (property) {
            case "backgroundColor" : {
                ArticleResponseDTO article = articleService.setBackgroundColor(slug, value);
                return new ResponseEntity<>(article, HttpStatus.OK);
            }
            case "fontColor" : {
                ArticleResponseDTO article = articleService.setFontColor(slug, value);
                return new ResponseEntity<>(article, HttpStatus.OK);
            }
            case "emoji" : {
                ArticleResponseDTO article = articleService.setEmoji(slug, value);
                return new ResponseEntity<>(article, HttpStatus.OK);
            }
            default: {
                throw new RuntimeException("The given property does not exist or can not be assigned to article: " + property);
            }
        }
    }

    //Operations with Users
    @GetMapping("/users")
    public ResponseEntity<List<UserResponseDTO>> getFavsForArticle(@RequestParam String slug ) throws EntityDoesNotExistsException {
        List<UserResponseDTO> favUsers = articleService.getFavUsers(slug);
        return new ResponseEntity<>(favUsers, HttpStatus.OK);
    }

    @PostMapping("/users")
    public ResponseEntity<ArticleResponseDTO> setFavsForUser(@RequestParam String slug, Authentication authentication) throws EntityDoesNotExistsException {
        User loggedUser = (User) authentication.getPrincipal();
        ArticleResponseDTO article = articleService.setFavorite(slug, loggedUser.getUsername());
        return new ResponseEntity<>(article, HttpStatus.OK);
    }
    @DeleteMapping("/users")
    public ResponseEntity<ArticleResponseDTO> removeFavsForUser(@RequestParam String slug, Authentication authentication) throws EntityDoesNotExistsException {
        User loggedUser = (User) authentication.getPrincipal();
        ArticleResponseDTO article = articleService.removeFavorite(slug, loggedUser.getUsername());
        return new ResponseEntity<>(article, HttpStatus.OK);
    }

    @GetMapping("/favs")
    public  ResponseEntity<ArticleListDTO> getFavsForUser(@RequestParam(required = true) String username, @RequestParam(required = false) Integer limit, @RequestParam(required = false) Integer offset, Authentication authentication) throws EntityDoesNotExistsException {

        List<ArticleResponseDTO> articleList = articleService.getFavArticles(username);
        Integer count = articleList.size();

        //Crop the list into pieces of 3 by offset
        if (limit != null && offset != null) {
            Integer initOffset = offset*limit;
            Integer endOffset = initOffset + limit;
            if (endOffset > count) {
                articleList = articleList.subList(initOffset, count);
            } else {
                articleList = articleList.subList(initOffset, endOffset);
            }
        }

        //if there is loggedUser, check favorite articles
        if (Objects.nonNull(authentication) && authentication.isAuthenticated()) {
            User loggedUser = (User) authentication.getPrincipal();
            //if loggedUser, check Fav articles
            articleList = articleList.stream().map( article ->
                    article.withFav(articleService.checkFav(article.id(), loggedUser.getUsername()))
            ).toList();


            //if loggedUser, check if following the author(s) of the article(s)
            articleList = articleList.stream().map(
                    article ->
                            article.withAuthor(article.author().withFollowing(userService.isFollowing(article.author().id(), loggedUser.getUsername())))
            ).toList();
        }

        return new ResponseEntity<>(new ArticleListDTO(count, articleList), HttpStatus.OK);
    }

    //Operations with Tags
    @GetMapping("/tags")
    public  ResponseEntity<ArticleListDTO> getArticlesByTag(@RequestParam(required = true) String tag, @RequestParam(required = false) Integer limit, @RequestParam(required = false) Integer offset, @RequestHeader HttpHeaders headers) throws TagNotFoundException {

        List<ArticleResponseDTO> articleList = articleService.getArticlesByTag(tag);
        Integer count = articleList.size();
        String token = headers.getFirst("Authorization");

        String loggedUsername;
        if (token != null ) {
            token = token.replace("Bearer ","");
            loggedUsername = tokenService.validateToken(token);
        } else {
            loggedUsername = "";
        }

        //Crop the list into pieces of 3 by offset
        if (limit != null && offset != null) {
            Integer initOffset = offset*limit;
            Integer endOffset = initOffset + limit;
            if (endOffset > count) {
                articleList = articleList.subList(initOffset, count);
            } else {
                articleList = articleList.subList(initOffset, endOffset);
            }
        }

        if (!loggedUsername.isBlank()) {
            articleList = articleList.stream().map(article ->
                    article.withAuthor(article.author().withFollowing(userService.isFollowing(article.author().id(), loggedUsername)))
            ).toList();
        }

        return new ResponseEntity<>(new ArticleListDTO(count, articleList), HttpStatus.OK);
    }

    @GetMapping("/global/tags")
    public ResponseEntity<List<Tag>> getAllTags() {
        List<Tag> tags = tagService.getAllTags();
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
    public ResponseEntity<CommentListDTO> getCommentsOfArticle(@RequestParam(required = true) String slug) throws EntityDoesNotExistsException {
        List<CommentDTO> comments = commentService.getCommentOfArticle(slug);

        return new ResponseEntity<>(new CommentListDTO(comments.size(), comments), HttpStatus.OK);

    }
    @PostMapping("/comments")
    public ResponseEntity<CommentDTO> postComment(@RequestParam(required = true) String body, @RequestParam(required = true) String slug, @RequestParam(required = true) String username) throws EntityDoesNotExistsException {
        CommentDTO comment = commentService.createComment(body, username, slug);
        return new ResponseEntity<>(comment, HttpStatus.CREATED);
    }
    @PutMapping("/comments/{commentId}")
    public ResponseEntity<CommentDTO> editComment(@PathVariable Long commentId, @RequestParam(required = true) String body) throws EntityDoesNotExistsException {
        CommentDTO comment = commentService.updateComment(commentId, body);
        return new ResponseEntity<>(comment, HttpStatus.OK);
    }
    @DeleteMapping("/comments/{commentId}")
    public ResponseEntity<Void> deleteComment(@PathVariable Long commentId, @RequestParam(required = true) String slug, @RequestHeader HttpHeaders headers) throws EntityDoesNotExistsException {
        commentService.deleteComment(commentId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/email")
    public ResponseEntity<String> sendEmail(@RequestBody EmailDTO emailDTO) throws MessagingException {
        emailService.sendGreetingEmail(emailDTO.to());
        return new ResponseEntity<>("Email Sent!!", HttpStatus.OK);
    }
}
