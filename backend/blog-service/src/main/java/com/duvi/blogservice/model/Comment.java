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

    @ManyToOne
    @JoinColumn(name = "article_id")
    @JsonIgnore
    private Article article;
    @ManyToOne
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


}
