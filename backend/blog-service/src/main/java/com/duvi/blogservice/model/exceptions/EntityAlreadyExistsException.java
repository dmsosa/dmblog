package com.duvi.blogservice.model.exceptions;

public class EntityAlreadyExistsException extends Exception {
    public EntityAlreadyExistsException(String title) {
        super("Entity with title '%s' already exists!".formatted(title));
    }

}
