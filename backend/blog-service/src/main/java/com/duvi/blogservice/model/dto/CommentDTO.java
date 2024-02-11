package com.duvi.blogservice.model.dto;

import jakarta.annotation.Nullable;

import java.time.LocalDateTime;

public record CommentDTO(Long articleId, Long userId, String body, @Nullable LocalDateTime postedAt, @Nullable LocalDateTime updatedAt) {
}
