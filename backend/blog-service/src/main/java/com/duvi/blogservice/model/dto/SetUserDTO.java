package com.duvi.blogservice.model.dto;

import org.springframework.web.multipart.MultipartFile;

public record SetUserDTO(
        String username,
        String email,
        String bio,
        MultipartFile image,
        MultipartFile backgroundImage,
        String icon,
        String backgroundColor
        ) {
}
