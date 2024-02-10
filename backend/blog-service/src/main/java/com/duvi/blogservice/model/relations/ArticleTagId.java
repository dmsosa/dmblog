package com.duvi.blogservice.model.relations;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
@Embeddable
public class ArticleTagId {

    @Column(name = "article_id")
    Long articleId;

    @Column(name = "tag_name")
    String tagName;
}
