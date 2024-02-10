package com.duvi.blogservice.model.dto;

import com.duvi.blogservice.model.Article;
import com.duvi.blogservice.model.User;

import java.time.LocalDateTime;

public record ArticleDTO(Long userId, String title, String body, String description, String slug, LocalDateTime createdAt, LocalDateTime updatedAt, Integer favoritesCount) {


}
