package com.duvi.authservice.controller;

import com.duvi.authservice.config.TokenService;
import com.duvi.authservice.model.*;
import com.duvi.authservice.repository.UserRepository;
import com.duvi.authservice.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/api/auth")
public class AuthController {
    Logger logger = LoggerFactory.getLogger(AuthController.class);

    @Autowired
    AuthenticationManager authenticationManager;
    @Autowired
    TokenService tokenService;

    @Autowired
    UserService userService;


    @GetMapping("/login")
    public ResponseEntity<AuthResponse> getLoggedUser(@RequestHeader(HttpHeaders.AUTHORIZATION) String bearerToken) {
        String token = bearerToken.replace("Bearer ", "");
        String username = tokenService.validateToken(token);
        User user = userService.findUserByUsername(username);
        UserDTO userDTO = new UserDTO(user.getUsername(), user.getEmail(), user.getRole());
        AuthResponse authResponse = new AuthResponse(token, userDTO);
        return new ResponseEntity<>(authResponse, HttpStatus.OK);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> logUser(@RequestBody LoginDTO loginDTO) throws Exception {
        User user = userService.findByLogin(loginDTO.login());
        var usernamePassword = new UsernamePasswordAuthenticationToken(user.getUsername(), loginDTO.password());
        Authentication auth = authenticationManager.authenticate(usernamePassword);
        String token = tokenService.generateToken((User) auth.getPrincipal());
        UserDTO userDTO = new UserDTO(user.getUsername(), user.getEmail(), user.getRole());
        AuthResponse authResponse = new AuthResponse(token, userDTO);
        return new ResponseEntity<>(authResponse, HttpStatus.OK);
    }
    @PostMapping("/register")
    public ResponseEntity<AuthResponse> registerUser(@RequestBody RegisterDTO registerDTO) throws Exception {
        if (userService.existsByUsername(registerDTO.username())) {
            throw new Exception("exists by Username");
        } else if (userService.existsByEmail(registerDTO.email())) {
            throw new Exception("exists by Email");
        }
        String encryptedPassword = new BCryptPasswordEncoder().encode(registerDTO.password());
        User newUser = new User(registerDTO, encryptedPassword);
        newUser = userService.saveUser(newUser);

        //User created, returning response with token

        String token = tokenService.generateToken(newUser);
        UserDTO userDTO = new UserDTO(newUser.getUsername(), newUser.getEmail(), newUser.getRole());
        AuthResponse registerResponse = new AuthResponse(token, userDTO);
        return new ResponseEntity<>(registerResponse, HttpStatus.OK);
    }
}
