package com.duvi.blogservice.model.dto;

import java.util.List;

public record ArticleListDTO(List<ArticleResponseDTO> articles, Long articlesCount) {
}
