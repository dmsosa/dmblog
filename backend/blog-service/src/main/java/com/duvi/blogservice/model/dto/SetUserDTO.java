package com.duvi.blogservice.model.dto;

import org.springframework.web.multipart.MultipartFile;

public record SetUserDTO(
        String username,
        String email,
        MultipartFile image,
        MultipartFile backgroundImage,
        String bio,
        String backgroundColor,
        String icon
        ) {
}
