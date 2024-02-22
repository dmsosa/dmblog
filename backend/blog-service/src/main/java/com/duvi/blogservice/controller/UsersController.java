package com.duvi.blogservice.controller;


import com.duvi.blogservice.config.security.TokenService;
import com.duvi.blogservice.model.User;
import com.duvi.blogservice.model.dto.*;
import com.duvi.blogservice.model.exceptions.UserAlreadyExistsException;
import com.duvi.blogservice.model.exceptions.UserNotFoundException;
import com.duvi.blogservice.model.relations.UserFollower;
import com.duvi.blogservice.service.UserService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UsersController {

//    endpoints

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

    @GetMapping("/login")
    public ResponseEntity<AuthResponseDTO> currentUser(@RequestHeader HttpHeaders headers) throws UserNotFoundException, UserNotFoundException {
        String bearerToken = headers.get("Authorization").getFirst();
        String token = bearerToken.replace("Bearer ", "");
        String username = tokenService.validateToken(token);
        UserDTO user = userService.findUserByUsername(username);
        AuthResponseDTO response = new AuthResponseDTO(token, user);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponseDTO> loginUser(@RequestBody LoginDTO loginDTO) throws UserNotFoundException {
        if (!userService.existsByLogin(loginDTO.login())) {
            throw new UserNotFoundException("User with login '%s' do not exists!".formatted(loginDTO.login()));
        }
        var usernamePassword = new UsernamePasswordAuthenticationToken(loginDTO.login(), loginDTO.password());
        Authentication auth = authenticationManager.authenticate(usernamePassword);
        User user = (User) auth.getPrincipal();
        String token = tokenService.generateToken(user);
        UserDTO userDTO = userService.createDTO(user);
        AuthResponseDTO responseDTO = new AuthResponseDTO(token, userDTO);
        return new ResponseEntity<>(responseDTO, HttpStatus.OK);
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponseDTO> registerUser(@RequestBody RegisterDTO registerDTO) throws UserAlreadyExistsException {
        //User service will check if username and email are available, and
        // encrypt the password before storing the new user into the database
        UserDTO createdUser = userService.createUser(registerDTO);
        var authToken = new UsernamePasswordAuthenticationToken(createdUser.username(), registerDTO.password());
        Authentication auth = authenticationManager.authenticate(authToken);
        String token = tokenService.generateToken((User) auth.getPrincipal());
        UserDTO userDTO = userService.createDTO((User) auth.getPrincipal());
        AuthResponseDTO responseDTO = new AuthResponseDTO(token, userDTO);
        return new ResponseEntity<>(responseDTO, HttpStatus.OK);
    }

    @GetMapping("/")
    public ResponseEntity<List<UserDTO>> getAllUsers() {
        List<UserDTO> users = userService.getAllUsers();
        return new ResponseEntity<>(users, HttpStatus.OK);
    }
    @GetMapping("/find/{userId}")
    public ResponseEntity<UserDTO> getUserById(@PathVariable Long userId) throws UserNotFoundException {
        UserDTO user = userService.findUserById(userId);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @GetMapping("/{username}")
    public ResponseEntity<UserDTO> getUserByUsername(@PathVariable String username) throws UserNotFoundException {
        UserDTO userDTO = userService.findUserByUsername(username);
        return new ResponseEntity<>(userDTO, HttpStatus.OK);
    }
    @PutMapping("/")
    public ResponseEntity<AuthResponseDTO> updateUser(@RequestBody SetUserDTO newUserDTO, @RequestHeader HttpHeaders headers ) {
        String token = headers.getFirst("Authorization").replace("Bearer ", "");
        String username = tokenService.validateToken(token);
        UserDTO userDTO = userService.updateUser(username, newUserDTO);
        var authToken = new UsernamePasswordAuthenticationToken(newUserDTO.username(), newUserDTO.password());
        Authentication authentication = authenticationManager.authenticate(authToken);
        String newToken = tokenService.generateToken((User) authentication.getPrincipal() );
        AuthResponseDTO response = new AuthResponseDTO(newToken, userDTO);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    @GetMapping("/followers/{userId}")
    public ResponseEntity<List<UserDTO>> getFollowersOf(@PathVariable Long userId) {
        List<UserDTO> followers = userService.findFollowersOf(userId);
        return new ResponseEntity<>(followers, HttpStatus.OK);
    }
    @GetMapping("/following/{userId}")
    public ResponseEntity<List<UserDTO>> getFollowingOf(@PathVariable Long userId) {
        List<UserDTO> followers = userService.findFollowingOf(userId);
        return new ResponseEntity<>(followers, HttpStatus.OK);
    }
    @GetMapping("/followingId/{userId}")
    public ResponseEntity<List<Long>> getFollowingIdOf(@PathVariable Long userId) throws UserNotFoundException {
        List<Long> followingsId = userService.findFollowingIdsOf(userId);
        return new ResponseEntity<>(followingsId, HttpStatus.OK);
    }

    @PostMapping("/follow/{username}")
    public ResponseEntity<String> followUser(@PathVariable String username, @RequestHeader HttpHeaders headers) throws UserNotFoundException {
        String token = headers.getFirst("Authorization").replace("Bearer ", "");
        String fromUsername = tokenService.validateToken(token);
        UserDTO fromUser = userService.findUserByUsername(fromUsername);
        UserDTO toUser = userService.findUserByUsername(username);
        userService.followUser(fromUser.id(), toUser.id());
        return new ResponseEntity<>("User %1$s now follows user %2$s".formatted(fromUsername, username), HttpStatus.OK);
    }
    @DeleteMapping("/follow/{username}")
    public ResponseEntity<String> unfollowUser(@PathVariable String username, @RequestHeader HttpHeaders headers) throws UserNotFoundException {
        String token = headers.getFirst("Authorization").replace("Bearer ", "");
        String fromUsername = tokenService.validateToken(token);
        UserDTO fromUser = userService.findUserByUsername(fromUsername);
        UserDTO toUser = userService.findUserByUsername(username);
        userService.unfollowUser(fromUser.id(), toUser.id());
        return new ResponseEntity<>("User %1$s now follows user %2$s".formatted(fromUsername, username), HttpStatus.OK);
    }

}
