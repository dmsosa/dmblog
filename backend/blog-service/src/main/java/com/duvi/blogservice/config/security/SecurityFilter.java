package com.duvi.blogservice.config.security;

import com.auth0.jwt.exceptions.TokenExpiredException;
import com.duvi.blogservice.controller.GlobalExceptionHandler;
import com.duvi.blogservice.model.exceptions.ApiError;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.validation.ObjectError;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.servlet.HandlerExceptionResolver;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Collections;
import java.util.Enumeration;

@Component
public class SecurityFilter extends OncePerRequestFilter {

    private TokenService tokenService;
    private AuthenticationService authenticationService;

    @Qualifier("handlerExceptionResolver")
    private HandlerExceptionResolver resolver;

    public SecurityFilter(TokenService tokenService, AuthenticationService authenticationService,     @Qualifier("handlerExceptionResolver")  HandlerExceptionResolver resolver) {
        this.tokenService = tokenService;
        this.authenticationService = authenticationService;
        this.resolver = resolver;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String token = getToken(request);
        if (token != null ) {
                String username = tokenService.validateToken(token);
                UserDetails userDetails = authenticationService.loadUserByUsername(username);
                Authentication authentication = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }

        filterChain.doFilter(request, response);

    }

    private String getToken(HttpServletRequest request) {
        String token = request.getHeader("Authorization");
        if (token == null) {
            return null;
        }
        return token.replace("Bearer ", "");
    }


}
