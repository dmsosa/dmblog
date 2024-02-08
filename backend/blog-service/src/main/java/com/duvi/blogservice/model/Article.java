package com.duvi.blogservice.model;


import com.duvi.blogservice.model.dto.ArticleDTO;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
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
    private LocalDate createdAt;
    private LocalDate updatedAt;
    @ManyToMany(
            fetch = FetchType.LAZY,
            cascade = {
                    CascadeType.PERSIST,
                    CascadeType.MERGE,
                    CascadeType.DETACH,
                    CascadeType.REFRESH }
    )
    @JoinTable(
            name = "favorites",
            joinColumns = @JoinColumn(name = "article_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    Set<User> favUsers;
    @ManyToMany
    Set<Tag> tags;

    public Article(ArticleDTO articleDTO, User user) {
        this.author = user;
        this.body = articleDTO.body();
        this.description = articleDTO.description();
        this.title = articleDTO.title();
        this.slug = articleDTO.slug();
        this.createdAt = LocalDate.now();
        this.updatedAt = LocalDate.now();
    }

    public void update(Article newArticle) {
        this.id = newArticle.getId();
        this.author = newArticle.getAuthor();
        this.title = newArticle.getTitle();
        this.body = newArticle.getBody();
        this.description = newArticle.getDescription();
        this.slug = newArticle.getSlug();
        this.updatedAt = LocalDate.now();
    }
}
