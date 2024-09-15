package com.duvi.blogservice.model.dto;

import java.util.List;

public record ArticleListDTO(Integer articlesCount, List<ArticleResponseDTO> articles) {
}
