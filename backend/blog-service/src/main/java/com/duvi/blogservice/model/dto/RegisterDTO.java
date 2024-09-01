package com.duvi.blogservice.model.dto;

import com.duvi.blogservice.model.UserRole;

public record RegisterDTO(
        String username,
        String email,
        String password,
        UserRole role) {
}
