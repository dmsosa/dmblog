package com.duvi.blogservice.model.exceptions;

public class CommentNotFoundException extends Exception {
    public CommentNotFoundException(String message) {
        super(message);
    }
    public CommentNotFoundException(Long id) {
        super("Comment with id '%s' do not exists!".formatted(id));
    }

}
