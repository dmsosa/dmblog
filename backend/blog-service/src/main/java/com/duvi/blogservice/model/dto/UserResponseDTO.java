package com.duvi.blogservice.model.dto;

import java.time.LocalDateTime;

public record UserResponseDTO(Long id,
                              String username,
                              String email,
                              String password,
                              String bio,
                              String image,
                              Integer followersCount,
                              Integer followingCount,
                              LocalDateTime createdAt,
                              LocalDateTime updatedAt,
                              Boolean isFollowing ) {
    public UserResponseDTO withFollowing(Boolean isFollowing) {
        return new UserResponseDTO(id(), username(), email(), password(), bio(), image(), followersCount(),
                followingCount(), createdAt(), updatedAt(), isFollowing);
    }
}
