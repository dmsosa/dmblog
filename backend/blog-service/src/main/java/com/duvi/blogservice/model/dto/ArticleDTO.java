package com.duvi.blogservice.model.dto;

import com.duvi.blogservice.model.Article;
import com.duvi.blogservice.model.User;

import java.time.LocalDateTime;
import java.util.List;

public record ArticleDTO(
        Long id,
        Long userId,
        String title,
        String body,
        String description,
        String slug,
        List<String> tagList,
        LocalDateTime createdAt,
        LocalDateTime updatedAt,
        Integer favoritesCount) {


}
