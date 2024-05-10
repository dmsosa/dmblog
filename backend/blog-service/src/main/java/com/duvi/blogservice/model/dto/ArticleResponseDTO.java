package com.duvi.blogservice.model.dto;

import java.time.LocalDateTime;
import java.util.List;

public record ArticleResponseDTO(
        Long id,
        UserResponseDTO author,
        String title,
        String body,
        String description,
        String slug,
        String fontColor,
        String backgroundColor,
        String emoji,
        List<String> tagList,
        LocalDateTime createdAt,
        LocalDateTime updatedAt,
        Integer favoritesCount,
        Boolean isFav
) {

    public ArticleResponseDTO withAuthor(UserResponseDTO author) {
        return new ArticleResponseDTO(id(), author, title(), body(), description(), slug(), fontColor(), backgroundColor(), emoji(), tagList(),
                createdAt(), updatedAt(), favoritesCount(), isFav());
    }
    public ArticleResponseDTO withFav(Boolean isFav) {
        return new ArticleResponseDTO(id(), author(), title(), body(), description(), slug(), fontColor(), backgroundColor(), emoji(), tagList(),
                createdAt(), updatedAt(), favoritesCount(), isFav);
    }

}
