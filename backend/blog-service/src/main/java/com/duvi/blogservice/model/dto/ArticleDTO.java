package com.duvi.blogservice.model.dto;

import com.duvi.blogservice.model.Article;

public record ArticleDTO(Long userId, String title, String body, String description, String slug) {


}
