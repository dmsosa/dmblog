package com.duvi.blogservice.controller;

import com.auth0.jwt.exceptions.TokenExpiredException;
import com.duvi.blogservice.model.exceptions.*;
import jakarta.servlet.RequestDispatcher;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.util.WebUtils;

import java.util.Collections;

@ControllerAdvice
@Controller
public class GlobalExceptionHandler implements ErrorController {

    public String getErrorPath() {
        return "/error";
    }
    @GetMapping("/error")
    public ResponseEntity<ApiError> errorHandler(HttpServletRequest request, HttpServletResponse response) throws Throwable {
        if (request.getAttribute(RequestDispatcher.ERROR_EXCEPTION) != null) {
            throw (Throwable) request.getAttribute(RequestDispatcher.ERROR_EXCEPTION);
        }
        ObjectError error = new ObjectError("Unknown Error during filter chain", request.toString());
        ApiError apiError = new ApiError(Collections.singletonList(error));
        return new ResponseEntity<>(apiError, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    @PutMapping("/error")
    public ResponseEntity<ApiError> putErrorHandler(HttpServletRequest request, HttpServletResponse response) throws Throwable {
        if (request.getAttribute(RequestDispatcher.ERROR_EXCEPTION) != null) {
            throw (Throwable) request.getAttribute(RequestDispatcher.ERROR_EXCEPTION);
        }
        ObjectError error = new ObjectError("Unknown Error during filter chain", request.toString());
        ApiError apiError = new ApiError(Collections.singletonList(error));
        return new ResponseEntity<>(apiError, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler
    public ResponseEntity<ApiError> exceptionHandler(Exception exception, WebRequest request) {
        HttpHeaders headers = new HttpHeaders();
        if (exception instanceof TokenExpiredException) {
            HttpStatus status = HttpStatus.NOT_ACCEPTABLE;
            TokenExpiredException tee = (TokenExpiredException) exception;
            return teeHandler(tee, headers, status, request);
        } else if (exception instanceof EntityDoesNotExistsException) {
            HttpStatus status = HttpStatus.NOT_FOUND;
            EntityDoesNotExistsException unfe = (EntityDoesNotExistsException) exception;
            return eaeeHandler(unfe, headers, status, request);
        } else if (exception instanceof EntityAlreadyExistsException) {
            HttpStatus status = HttpStatus.CONFLICT;
            EntityAlreadyExistsException eaee = (EntityAlreadyExistsException) exception;
            return aaeeHandler(eaee, headers, status, request);
        }
        else {
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
    public ResponseEntity<ApiError> eaeeHandler(EntityDoesNotExistsException eaee, HttpHeaders headers, HttpStatus status, WebRequest request) {
        ObjectError error = new ObjectError("Entity Not Found Exception", eaee.getMessage());
        ApiError body = new ApiError(Collections.singletonList(error));
        return internalHandler(eaee, body, headers, status, request);
    }
    public ResponseEntity<ApiError> aaeeHandler(EntityAlreadyExistsException aaee, HttpHeaders headers, HttpStatus status, WebRequest request) {
        ObjectError error = new ObjectError("Entity Already Exists Exception", aaee.getMessage());
        ApiError body = new ApiError(Collections.singletonList(error));
        return internalHandler(aaee, body, headers, status, request);
    }

    public ResponseEntity<ApiError> internalHandler(Exception ex, ApiError body, HttpHeaders headers, HttpStatus status, WebRequest request) {
        if (status.equals(HttpStatus.INTERNAL_SERVER_ERROR)) {
            request.setAttribute(WebUtils.ERROR_EXCEPTION_ATTRIBUTE, ex, WebRequest.SCOPE_REQUEST);
        }
        return new ResponseEntity<>(body, headers, status);
    }
}
