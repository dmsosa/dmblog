package com.duvi.authservice.controller.exception;

import com.duvi.authservice.model.exception.ApiError;
import jakarta.annotation.Nullable;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.util.WebUtils;

import java.util.Collections;
import java.util.NoSuchElementException;


@ControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler
    public ResponseEntity<ApiError> exceptionHandler(Exception e, WebRequest request) {
        HttpHeaders headers = new HttpHeaders();
        if (e instanceof NoSuchElementException) {
            HttpStatus status = HttpStatus.NOT_FOUND;
            NoSuchElementException nsex = (NoSuchElementException) e;
            return handleNSEX(nsex, headers, status, request);
        }
        else {
            HttpStatus status = HttpStatus.INTERNAL_SERVER_ERROR;
            return internalExceptionHandler(e, null, headers, status, request);
        }
    }
    public ResponseEntity<ApiError> handleNSEX(NoSuchElementException e, HttpHeaders headers, HttpStatus status, WebRequest request) {
        ObjectError error = new ObjectError("No Such Element Exception", e.getMessage());
        ApiError body = new ApiError(Collections.singletonList(error));
        return internalExceptionHandler(e, body, headers, status, request);
    }
    public ResponseEntity<ApiError> internalExceptionHandler(Exception e, @Nullable ApiError body, HttpHeaders headers, HttpStatus status, WebRequest request) {
        if (status.equals(HttpStatus.INTERNAL_SERVER_ERROR)) {
            request.setAttribute(WebUtils.ERROR_EXCEPTION_ATTRIBUTE, e, WebRequest.SCOPE_REQUEST);
            ObjectError error = new ObjectError(e.getClass().getName(), e.getMessage());
            body = new ApiError(Collections.singletonList(error));
            return new ResponseEntity<>(body, headers, status);
        }
        return  new ResponseEntity<>(body, headers, status);
    }
}
