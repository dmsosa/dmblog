package com.duvi.blogservice.model.dto;

import com.duvi.blogservice.model.User;
import com.duvi.blogservice.model.UserRole;

public record RegisterDTO(String username, String email, String password, String bio, String image ,UserRole role) {
}
