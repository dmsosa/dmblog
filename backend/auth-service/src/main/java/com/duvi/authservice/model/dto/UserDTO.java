package com.duvi.authservice.model.dto;

import com.duvi.authservice.model.UserRole;

public record UserDTO(String username, String email, UserRole role) {
}
