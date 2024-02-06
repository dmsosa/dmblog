package com.duvi.authservice.model;

import com.duvi.authservice.model.dto.UserDTO;

public record AuthResponse (String token, UserDTO loggedUser) {
}
