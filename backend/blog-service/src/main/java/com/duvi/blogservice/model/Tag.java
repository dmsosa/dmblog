package com.duvi.blogservice.model;

import com.duvi.blogservice.model.relations.ArticleTag;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;

@Entity
@Table(name = "tags")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Tag {
    @Id
    private String name;
    @OneToMany(
            fetch = FetchType.LAZY,
            cascade = {
                    CascadeType.PERSIST,
                    CascadeType.MERGE,
                    CascadeType.DETACH,
                    CascadeType.REFRESH },
            mappedBy = "tag"
    )
    @JsonIgnore
    Set<ArticleTag> articles;

    public Tag(String tagName) {
        this.name = tagName;
        this.articles = null;
    }
}
