package com.duvi.blogservice.repository;

import com.duvi.blogservice.model.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findByAuthorId(Long userId);
    List<Comment> findByArticleId(Long articleId);
}
