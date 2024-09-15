package com.duvi.blogservice.model.relations;

import com.duvi.blogservice.model.Article;
import com.duvi.blogservice.model.Tag;
import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
@Entity
@Table(name = "cats")
public class ArticleTag {

    @EmbeddedId
    ArticleTagId id;

    @ManyToOne
    @MapsId("articleId")
    @JoinColumn(name = "article_id")
    Article article;

    @ManyToOne
    @MapsId("tagName")
    @JoinColumn(name = "tag_name")
    Tag tag;

    public ArticleTag(Article article, Tag tag) {
        this.id = new ArticleTagId(article.getId(), tag.getName());
        this.article = article;
        this.tag = tag;
    }
}
