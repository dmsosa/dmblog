package com.duvi.blogservice.model.exceptions;

public class ArticleAlreadyExistsException extends Exception {
    public ArticleAlreadyExistsException(String title) {
        super("Article with title '%s' already exists!".formatted(title));
    }

}
