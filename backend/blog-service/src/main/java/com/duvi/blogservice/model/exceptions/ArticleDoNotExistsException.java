package com.duvi.blogservice.model.exceptions;

public class ArticleDoNotExistsException extends Exception {
    public ArticleDoNotExistsException(String message) {
        super(message);
    }
    public ArticleDoNotExistsException(Long id) {
        super("Article with id '%s' do not exists!".formatted(id));
    }

}