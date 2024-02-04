package com.duvi.blogservice.repository;

import com.duvi.blogservice.model.Article;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ArticleRepository extends JpaRepository<Article, Long> {
    public boolean existsByTitle(String title);
    public boolean existsById(Long id);
    Optional<Article> findByTitle(String title);
}
