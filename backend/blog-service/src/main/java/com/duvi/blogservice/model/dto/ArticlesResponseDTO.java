package com.duvi.blogservice.model.dto;

import java.util.List;

public record ArticlesResponseDTO(List<ArticleResponseDTO> articles, Long articlesCount) {
}
