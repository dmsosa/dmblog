package com.duvi.authservice.model.dto;

import com.duvi.authservice.model.UserRole;

public record RegisterDTO (String username, String email, String password, UserRole role) {
}
// "ADMIN" == ADMIN