package com.duvi.blogservice.model.dto;

import com.duvi.blogservice.model.UserRole;

public record UserDTO(String username, String email, String password, UserRole role) {
}
