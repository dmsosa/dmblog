package com.duvi.blogservice.model.exceptions;

public class EntityDoesNotExistsException extends Exception {
    public EntityDoesNotExistsException(String message) {
        super(message);
    }
    public EntityDoesNotExistsException(Long id) {
        super("Article with id '%s' do not exists!".formatted(id));
    }

}