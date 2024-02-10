package com.duvi.blogservice.model.relations;

import com.duvi.blogservice.model.Article;
import com.duvi.blogservice.model.User;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
@Entity
@Table(name = "favorites")
public class ArticleUser {

    @EmbeddedId
    private ArticleUserId id;

    @ManyToOne
    @MapsId("userId")
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @MapsId("articleId")
    @JoinColumn(name = "article_id")
    private Article article;

    @Column(name = "marked_at")
    private LocalDateTime markedAt;


    public ArticleUser(User user, Article article) {
        this.id = new ArticleUserId(user.getId(), article.getId());
        this.user = user;
        this.article = article;
        this.markedAt = LocalDateTime.now();
    }


}
