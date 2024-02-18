package com.duvi.blogservice.model.dto;

import java.util.List;

public record SetArticleDTO(Long userId, String title, String body, String slug, String description, List<String> tagList) {
}
