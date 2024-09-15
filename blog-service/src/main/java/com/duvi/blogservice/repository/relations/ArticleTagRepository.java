package com.duvi.blogservice.repository.relations;

import com.duvi.blogservice.model.relations.ArticleTag;
import com.duvi.blogservice.model.relations.ArticleTagId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ArticleTagRepository extends JpaRepository<ArticleTag, ArticleTagId> {
    public List<ArticleTag> findByTagName(String tagName);
    public List<ArticleTag> findByArticleId(Long articleId);
}
