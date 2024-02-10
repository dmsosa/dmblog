package com.duvi.blogservice.model.dto;

import com.duvi.blogservice.model.Article;

import java.util.List;

public record ArticlesResponseDTO(List<ArticleDTO> articles, Long articlesCount) {
}
