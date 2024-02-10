package com.duvi.blogservice.model.relations;

import com.duvi.blogservice.model.User;
import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
@Embeddable
public class ArticleUserId {
    @Column(name = "user_id")
    Long userId;

    @Column(name = "article_id")
    Long articleId;
}
