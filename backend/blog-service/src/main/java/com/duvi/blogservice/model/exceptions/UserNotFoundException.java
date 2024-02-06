package com.duvi.blogservice.model.exceptions;

public class UserNotFoundException extends Exception {
    public UserNotFoundException(String message) {
        super(message);
    }
    public UserNotFoundException(Long id) {
        super("User with id '%s' do not exists!".formatted(id));
    }

}