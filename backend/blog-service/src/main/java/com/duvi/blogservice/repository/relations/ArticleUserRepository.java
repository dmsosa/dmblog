package com.duvi.blogservice.repository.relations;

import com.duvi.blogservice.model.relations.ArticleUser;
import com.duvi.blogservice.model.relations.ArticleUserId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ArticleUserRepository extends JpaRepository<ArticleUser, ArticleUserId> {
    public List<ArticleUser> findByArticleId(Long articleId);
    public List<ArticleUser> findByUserId(Long userId);
}
