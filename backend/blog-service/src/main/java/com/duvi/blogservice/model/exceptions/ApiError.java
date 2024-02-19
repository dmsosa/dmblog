package com.duvi.blogservice.model.exceptions;

import lombok.Getter;
import lombok.Setter;
import org.springframework.validation.ObjectError;

import java.util.List;

@Getter
@Setter
public class ApiError {

    private List<ObjectError> errors;

    public ApiError(List<ObjectError> errors) {
        this.errors = errors;
    }
    public List<ObjectError> getErrors() {
        return errors;
    }
}
