package com.duvi.blogservice.controller;

import com.auth0.jwt.exceptions.TokenExpiredException;
import com.duvi.blogservice.model.exceptions.*;
import jakarta.servlet.RequestDispatcher;
import jakarta.servlet.ServletException;
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

import java.io.IOException;
import java.util.Collections;
import java.util.Enumeration;

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

    @ExceptionHandler
    public ResponseEntity<ApiError> exceptionHandler(Exception exception, WebRequest request) {
        HttpHeaders headers = new HttpHeaders();
        if (exception instanceof TokenExpiredException) {
            HttpStatus status = HttpStatus.NOT_ACCEPTABLE;
            TokenExpiredException tee = (TokenExpiredException) exception;
            return teeHandler(tee, headers, status, request);
        } else if (exception instanceof UserNotFoundException) {
            HttpStatus status = HttpStatus.NOT_FOUND;
            UserNotFoundException unfe = (UserNotFoundException) exception;
            return unfeHandler(unfe, headers, status, request);
        } else if (exception instanceof UserAlreadyExistsException) {
            HttpStatus status = HttpStatus.CONFLICT;
            UserAlreadyExistsException uaee = (UserAlreadyExistsException) exception;
            return uaeeHandler(uaee, headers, status, request);
        }
        else if (exception instanceof ArticleDoNotExistsException) {
        HttpStatus status = HttpStatus.NOT_FOUND;
            ArticleDoNotExistsException anfe = (ArticleDoNotExistsException) exception;
        return anfeHandler(anfe, headers, status, request);
        } else if (exception instanceof ArticleAlreadyExistsException) {
        HttpStatus status = HttpStatus.CONFLICT;
            ArticleAlreadyExistsException aaee = (ArticleAlreadyExistsException) exception;
        return aaeeHandler(aaee, headers, status, request);
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
    public ResponseEntity<ApiError> unfeHandler(UserNotFoundException unfe, HttpHeaders headers, HttpStatus status, WebRequest request) {
        ObjectError error = new ObjectError("User Not Found Exception", unfe.getMessage());
        ApiError body = new ApiError(Collections.singletonList(error));
        return internalHandler(unfe, body, headers, status, request);
    }
    public ResponseEntity<ApiError> uaeeHandler(UserAlreadyExistsException uaee, HttpHeaders headers, HttpStatus status, WebRequest request) {
        ObjectError error = new ObjectError("User Already Exists Exception", uaee.getMessage());
        ApiError body = new ApiError(Collections.singletonList(error));
        return internalHandler(uaee, body, headers, status, request);
    }
    public ResponseEntity<ApiError> anfeHandler(ArticleDoNotExistsException anfe, HttpHeaders headers, HttpStatus status, WebRequest request) {
        ObjectError error = new ObjectError("Article Do Not Exists Exception", anfe.getMessage());
        ApiError body = new ApiError(Collections.singletonList(error));
        return internalHandler(anfe, body, headers, status, request);
    }
    public ResponseEntity<ApiError> aaeeHandler(ArticleAlreadyExistsException aaee, HttpHeaders headers, HttpStatus status, WebRequest request) {
        ObjectError error = new ObjectError("Article Already Exists Exception", aaee.getMessage());
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
