package com.duvi.blogservice.controller;

import com.auth0.jwt.exceptions.TokenExpiredException;
import com.duvi.blogservice.model.exceptions.ApiError;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.util.WebUtils;

import java.util.Collections;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler
    public ResponseEntity<ApiError> exceptionHandler(Exception exception, WebRequest request) {
        HttpHeaders headers = new HttpHeaders();
        if (exception instanceof TokenExpiredException) {
            HttpStatus status = HttpStatus.NOT_ACCEPTABLE;
            TokenExpiredException tee = (TokenExpiredException) exception;
            return teeHandler(tee, headers, status, request);
        } else {
            ObjectError error = new ObjectError("Unexpected Exception", exception.getMessage());
            ApiError body = new ApiError(Collections.singletonList(error));
            return internalHandler(exception, body, headers, HttpStatus.INTERNAL_SERVER_ERROR, request);
        }
    };

    public ResponseEntity<ApiError> teeHandler(TokenExpiredException tee, HttpHeaders headers, HttpStatus status, WebRequest request) {
        ObjectError error = new ObjectError("TokenExpiredException", tee.getMessage());
        ApiError body = new ApiError(Collections.singletonList(error));
        return internalHandler(tee, body, headers, status, request);
    }

    public ResponseEntity<ApiError> internalHandler(Exception ex, ApiError body, HttpHeaders headers, HttpStatus status, WebRequest request) {
        if (status.equals(HttpStatus.INTERNAL_SERVER_ERROR)) {
            request.setAttribute(WebUtils.ERROR_EXCEPTION_ATTRIBUTE, ex, WebRequest.SCOPE_REQUEST);
        }
        return new ResponseEntity<>(body, headers, status);
    }
}
