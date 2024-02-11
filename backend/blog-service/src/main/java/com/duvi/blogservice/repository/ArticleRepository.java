package com.duvi.blogservice.repository;

import com.duvi.blogservice.model.Article;
import com.duvi.blogservice.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Repository
public interface ArticleRepository extends JpaRepository<Article, Long> {
    public boolean existsByTitle(String title);
    public boolean existsById(Long id);
    public boolean existsBySlug(String articleSlug);
    public Optional<Article> findByTitle(String title);
    public Optional<Article> findBySlug(String slug);
    public List<Article> findArticleByAuthor(User author);

    void deleteBySlug(String articleSlug);
}
