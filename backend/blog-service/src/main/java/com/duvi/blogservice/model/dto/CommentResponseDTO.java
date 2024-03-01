package com.duvi.blogservice.model.dto;

import java.util.List;

public record CommentResponseDTO(List<CommentDTO> comments, Long commentsCount) {
}
