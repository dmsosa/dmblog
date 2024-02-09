package com.duvi.blogservice.repository;

import com.duvi.blogservice.model.Tag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TagRepository extends JpaRepository<Tag, Long> {
    public List<Tag> findTagsByArticlesId(Long articleId);
}
