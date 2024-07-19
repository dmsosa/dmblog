package com.duvi.blogservice.model.exceptions;

public class EntityAlreadyExistsException extends Exception {
    public EntityAlreadyExistsException(String title) {
        super("Entity already exists! \n%s".formatted(title));
    }

}
