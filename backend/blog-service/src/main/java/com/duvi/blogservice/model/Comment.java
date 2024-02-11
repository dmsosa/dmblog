package com.duvi.blogservice.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "comments")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "article_id")
    @JsonIgnore
    private Article article;
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id")
    @JsonIgnore
    private User user;
    private String body;
    private LocalDateTime postedAt;
    private LocalDateTime updatedAt;

    public Comment(User user, Article article, String body) {
        this.user = user;
        this.article = article;
        this.body = body;
        this.postedAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }
    public void updateWith(Comment comment) {
        this.user = comment.getUser();
        this.article = comment.getArticle();
        this.body = comment.getBody();
        this.updatedAt = LocalDateTime.now();
    }

}
