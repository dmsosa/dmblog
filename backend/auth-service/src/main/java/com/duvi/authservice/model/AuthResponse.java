package com.duvi.authservice.model;

public record AuthResponse (String token, UserDTO loggedUser) {
}
