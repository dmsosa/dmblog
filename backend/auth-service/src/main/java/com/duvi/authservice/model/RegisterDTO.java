package com.duvi.authservice.model;

public record RegisterDTO (String username, String email, String password, UserRole role) {
}
