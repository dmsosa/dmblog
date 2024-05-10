package com.duvi.blogservice.model.dto;

import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public record SetArticleDTO(
        Long userId,
        String title,
        String body,
        String slug,
        String backgroundColor,
        String emoji,
        String description,
        List<String> tagList,
        MultipartFile backgroundImage) {


}
