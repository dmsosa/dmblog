package com.duvi.blogservice.model;


import com.duvi.blogservice.model.dto.ArticleDTO;
import com.duvi.blogservice.model.dto.SetArticleDTO;
import com.duvi.blogservice.model.relations.ArticleTag;
import com.duvi.blogservice.model.relations.ArticleUser;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Set;

@Table(name = "articles")
@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Article {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User author;
    private String title;
    private String body;
    private String description;
    private String slug;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    //Relations
        //Users
    @OneToMany(
            fetch = FetchType.LAZY,
            cascade = {
                    CascadeType.PERSIST,
                    CascadeType.MERGE,
                    CascadeType.DETACH,
                    CascadeType.REFRESH }
            , mappedBy = "article"
    )
    Set<ArticleUser> favUsers;

        //Tags
    @OneToMany(
            fetch = FetchType.LAZY,
            cascade = {
                    CascadeType.PERSIST,
                    CascadeType.MERGE,
                    CascadeType.DETACH,
                    CascadeType.REFRESH }
            , mappedBy = "article"
    )
    private Set<ArticleTag> tags;
        //Comments
    @OneToMany(mappedBy = "article")
    private Set<Comment> comments;


    public Article(SetArticleDTO articleDTO, User user) {
        this.author = user;
        this.body = articleDTO.body();
        this.description = articleDTO.description();
        this.title = articleDTO.title();
        this.slug = articleDTO.slug();
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    public void updateWith(SetArticleDTO newArticle) {
        this.title = newArticle.title();
        this.body = newArticle.body();
        this.description = newArticle.description();
        this.slug = newArticle.slug();
        this.updatedAt = LocalDateTime.now();
    }
}
