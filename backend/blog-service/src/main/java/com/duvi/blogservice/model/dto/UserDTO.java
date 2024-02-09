package com.duvi.blogservice.model.dto;

import com.duvi.blogservice.model.User;
import com.duvi.blogservice.model.UserRole;

public record UserDTO(Long id, String username, String email, String password, String bio, String image, Integer followersCount, Integer followingCount) {

}
