package com.duvi.blogservice.controller;


import com.duvi.blogservice.config.security.TokenService;
import com.duvi.blogservice.model.User;
import com.duvi.blogservice.model.dto.AuthResponseDTO;
import com.duvi.blogservice.model.dto.LoginDTO;
import com.duvi.blogservice.model.dto.RegisterDTO;
import com.duvi.blogservice.model.exceptions.UserNotFoundException;
import com.duvi.blogservice.service.UserService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authorization.AuthorizationManager;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UsersController {

//    endpoints
//    /login current user and login
//    /register register user
//    /follow/{id} get all followers of userId
//    /follow?toId post: follow user delete unfollow user
//    /follow?fromId get all followedByUser
    private AuthenticationManager authenticationManager;
    private UserService userService;
    private TokenService tokenService;

    public UsersController(UserService userService, AuthenticationManager authenticationManager, TokenService tokenService) {
        this.userService = userService;
        this.authenticationManager = authenticationManager;
        this.tokenService = tokenService;
    }

//    @GetMapping("/login")
//    public ResponseEntity<AuthResponseDTO> currentUser(@RequestHeader HttpHeaders headers) throws UserNotFoundException {
//        String bearerToken = headers.get("Authorization").getFirst();
//        String token = bearerToken.replace("Bearer ", "");
//        String username = tokenService.validateToken(token);
//        User user = userService.findUserByUsername(username);
//        new AuthResponseDTO(token, )
//
//    }
//
//    @PostMapping("/login")
//    public ResponseEntity<AuthResponseDTO> loginUser(@RequestBody LoginDTO loginDTO) {
//
//    }
//
//    @PostMapping("/register")
//    public ResponseEntity<AuthResponseDTO> registerUser(@RequestBody RegisterDTO registerDTO) {
//
//    }

    @GetMapping("/")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.getAllUsers();
        return new ResponseEntity<>(users, HttpStatus.OK);
    }
    @GetMapping("/{userId}")
    public ResponseEntity<List<User>> getFollowers(@PathVariable Long userId) {
        List<User> users = userService.findUsersByFollowersId(userId);
        return new ResponseEntity<>(users, HttpStatus.OK);
    }
}
