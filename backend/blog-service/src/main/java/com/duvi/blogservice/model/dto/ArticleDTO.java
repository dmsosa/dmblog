package com.duvi.blogservice.model.dto;

import com.duvi.blogservice.model.Article;
import com.duvi.blogservice.model.User;
import jakarta.annotation.Nullable;

import java.time.LocalDateTime;
import java.util.List;

public record ArticleDTO(
        Long id,
        UserDTO author,
        String title,
        String body,
        String description,
        String slug,
        List<String> tagList,
        LocalDateTime createdAt,
        LocalDateTime updatedAt,
        Integer favoritesCount,
        Boolean isFav
) {

    public ArticleDTO withAuthor(UserDTO author) {
        return new ArticleDTO(id(), author, title(), body(), description(), slug(), tagList(),
                createdAt(), updatedAt(), favoritesCount(), isFav());
    }
    public ArticleDTO withFav(Boolean isFav) {
        return new ArticleDTO(id(), author(), title(), body(), description(), slug(), tagList(),
                createdAt(), updatedAt(), favoritesCount(), isFav);
    }

}
