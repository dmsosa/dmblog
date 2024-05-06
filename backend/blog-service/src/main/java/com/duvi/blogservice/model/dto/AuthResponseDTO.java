package com.duvi.blogservice.model.dto;

public record AuthResponseDTO(String token, UserResponseDTO loggedUser) {
    public AuthResponseDTO withUser(UserResponseDTO loggedUser) {
        return new AuthResponseDTO(token(), loggedUser);
    }
}
