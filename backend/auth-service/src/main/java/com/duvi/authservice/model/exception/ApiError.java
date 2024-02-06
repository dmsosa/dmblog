package com.duvi.authservice.model.exception;

import org.springframework.validation.ObjectError;

import java.util.List;
import java.util.Map;

public class ApiError {
    private List<ObjectError> errors;

    public ApiError(List<ObjectError> errors) {
        this.errors = errors;
    }

    public List<ObjectError> getErrors() {
        return this.errors;
    }

    public void setErrors(List<ObjectError> errors) {
        this.errors = errors;
    }
}
