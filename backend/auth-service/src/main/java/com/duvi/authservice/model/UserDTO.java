package com.duvi.authservice.model;

public record UserDTO(String username, String email, UserRole role) {
}
