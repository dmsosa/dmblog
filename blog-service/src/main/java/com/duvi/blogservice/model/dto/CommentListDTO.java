package com.duvi.blogservice.model.dto;

import java.util.List;

public record CommentListDTO(Integer commentsCount, List<CommentDTO> comments) {
}
