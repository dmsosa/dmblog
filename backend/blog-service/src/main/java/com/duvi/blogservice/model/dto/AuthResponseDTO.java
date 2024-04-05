package com.duvi.blogservice.model.dto;

public record AuthResponseDTO(String token, UserDTO loggedUser) {
    public AuthResponseDTO withUser(UserDTO loggedUser) {
        return new AuthResponseDTO(token(), loggedUser);
    }
}
