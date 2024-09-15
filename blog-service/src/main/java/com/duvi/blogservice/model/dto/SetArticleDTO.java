package com.duvi.blogservice.model.dto;

import jakarta.annotation.Nullable;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public record SetArticleDTO(
        @Nullable Long articleId,
        Long userId,
        String slug,
        @Nullable String newSlug,
        String title,
        String body,
        String description,
        String backgroundColor,
        String fontColor,
        String emoji,
        List<String> tagList,
        @Nullable MultipartFile image) {


}
