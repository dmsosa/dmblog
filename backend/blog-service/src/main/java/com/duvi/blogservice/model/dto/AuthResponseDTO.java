package com.duvi.blogservice.model.dto;

public record AuthResponseDTO(String token, UserDTO loggedUser) {
}
