package com.duvi.blogservice.model.exceptions;

public class TagNotFoundException extends Exception {
    public TagNotFoundException(String message) {
        super(message);
    }
    public TagNotFoundException(Long id) {
        super("Tag with id '%s' do not exists!".formatted(id));
    }

}