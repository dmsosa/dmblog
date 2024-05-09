package com.duvi.blogservice.repository;

import com.duvi.blogservice.model.Article;
import com.duvi.blogservice.model.User;
import jakarta.persistence.EntityManager;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.time.LocalDateTime;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
public class ArticleRepositoryTest {


    @Autowired
    private ArticleRepository repository;
    @Autowired
    private EntityManager entityManager;

    public ArticleRepositoryTest() {

    }

    //populate db
    @BeforeEach
    void setup() {
        Article a1 = new Article("article 1 title", "article 1 body", "article 1 description", "article-1-slug", LocalDateTime.now().minusDays(3L));
        Article a2 = new Article("article 2 title", "article 2 body", "article 2 description", "article-2-slug", LocalDateTime.now().minusDays(3L));
        Article a3 = new Article("article 3 title", "article 3 body", "article 3 description", "article-3-slug", LocalDateTime.now().minusDays(3L));
        Article a4 = new Article("article 4 title", "article 4 body", "article 4 description", "article-4-slug", LocalDateTime.now().minusDays(3L));
        User author1 = new User("author 1", "author1@test.com", "author 1 bio");
        User author2 = new User("author 2", "author2@test.com", "author 2 bio");
        User author3 = new User("author 3", "author3@test.com", "author 3 bio");
        User author4 = new User("author 4", "author4@test.com", "author 4 bio");
        a1.setAuthor(author1);
        a2.setAuthor(author2);
        a3.setAuthor(author3);
        a4.setAuthor(author4);
        entityManager.persist(a1);
        entityManager.persist(a2);
        entityManager.persist(a3);
    }

    @Test
    public void repositoryIsNotEmpty() {
        assertFalse(repository.findAll().isEmpty());
    }
    @Test
    public void whenArticleExistsThenReturnsEntity() {
        Optional<Article> article = repository.findBySlug("article-1-slug");
        assertTrue(article.isPresent());
    }
    @Test
    public void whenArticleDoNotExistsThenReturnsEmpty() {
        Optional<Article> article = repository.findBySlug("i-dont-exist");
        assertTrue(article.isEmpty());
    }
    @Test
    public void whenArticleSavedThenPersisted() {
        Article newArticle = new Article("article new title", "article new body", "article new description", "article-new-slug", LocalDateTime.now());
        Article article = repository.save(newArticle);
        assertEquals(article.getBody(), newArticle.getBody());
    }
    @Test
    public void deleteTest() {
        repository.deleteBySlug("article-1-slug");
        Optional<Article> article = repository.findBySlug("article-1-slug");
        assertTrue(article.isEmpty());
    }
}
