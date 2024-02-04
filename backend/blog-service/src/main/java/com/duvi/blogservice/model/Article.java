package com.duvi.blogservice.model;


import com.duvi.blogservice.model.dto.ArticleDTO;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Article {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long userId;
    private String title;
    private String body;
    private String description;
    private String slug;

    public Article(ArticleDTO articleDTO) {
        this.userId = articleDTO.userId();
        this.body = articleDTO.body();
        this.description = articleDTO.description();
        this.title = articleDTO.title();
        this.slug = articleDTO.slug();
    }

    public void update(Article newArticle) {
        this.id = newArticle.getId();
        this.userId = newArticle.getUserId();
        this.title = newArticle.getTitle();
        this.body = newArticle.getBody();
        this.description = newArticle.getDescription();
        this.slug = newArticle.getSlug();
    }
}
