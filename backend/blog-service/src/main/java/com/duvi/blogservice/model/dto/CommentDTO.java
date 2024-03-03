package com.duvi.blogservice.model.dto;

import jakarta.annotation.Nullable;

import java.time.LocalDateTime;

public record CommentDTO(Long articleId, String image, String username, String body, @Nullable LocalDateTime postedAt, @Nullable LocalDateTime updatedAt) {
}
