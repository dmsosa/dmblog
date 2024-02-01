package com.duvi.blogservice.model.dto;

public record CommentDTO(Long articleId, Long userId, String body) {
}
