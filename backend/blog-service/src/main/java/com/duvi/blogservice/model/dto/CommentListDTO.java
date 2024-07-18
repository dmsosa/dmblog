package com.duvi.blogservice.model.dto;

import java.util.List;

public record CommentListDTO(List<CommentDTO> comments, Long commentsCount) {
}
