package com.duvi.blogservice.model;


import com.duvi.blogservice.model.dto.ArticleDTO;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

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
    private User user;
    private String title;
    private String body;
    private String description;
    private String slug;
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

    public Article(ArticleDTO articleDTO, User user) {
        this.user = user;
        this.body = articleDTO.body();
        this.description = articleDTO.description();
        this.title = articleDTO.title();
        this.slug = articleDTO.slug();
    }

    public void update(Article newArticle) {
        this.id = newArticle.getId();
        this.user = newArticle.getUser();
        this.title = newArticle.getTitle();
        this.body = newArticle.getBody();
        this.description = newArticle.getDescription();
        this.slug = newArticle.getSlug();
    }
}
