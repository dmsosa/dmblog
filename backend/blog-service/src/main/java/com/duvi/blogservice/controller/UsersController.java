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
        user = user.withFollowing(userService.isFollowing(user.id(), username));
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
    public ResponseEntity<List<UserDTO>> getAllUsers(@RequestHeader HttpHeaders headers) {
        String token = headers.getFirst("Authorization");
        List<UserDTO> users = userService.getAllUsers();

        if (token != null) {
            token = token.replace("Bearer ", "");
            String loggedUsername = tokenService.validateToken(token);
            users = users.stream().map(
                    userDTO -> userDTO.withFollowing(userService.isFollowing(userDTO.id(), loggedUsername))
            ).toList();
        };
        return new ResponseEntity<>(users, HttpStatus.OK);
    }
    @GetMapping("/find/{userId}")
    public ResponseEntity<UserDTO> getUserById(@PathVariable Long userId, @RequestHeader HttpHeaders headers) throws UserNotFoundException {
        String token = headers.getFirst("Authorization");
        UserDTO user = userService.findUserById(userId);

        if (token != null) {
            token = token.replace("Bearer ", "");
            String loggedUsername = tokenService.validateToken(token);
            user = user.withFollowing(userService.isFollowing(user.id(), loggedUsername));
        }
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @GetMapping("/{username}")
    public ResponseEntity<UserDTO> getUserByUsername(@PathVariable String username, @RequestHeader HttpHeaders headers) throws UserNotFoundException {
        String token = headers.getFirst("Authorization");
        UserDTO userDTO = userService.findUserByUsername(username);

        if (token != null) {
            token = token.replace("Bearer ", "");
            String loggedUsername = tokenService.validateToken(token);
            userDTO = userDTO.withFollowing(userService.isFollowing(userDTO.id(), loggedUsername));
        }
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
    public ResponseEntity<List<UserDTO>> getFollowersOf(@PathVariable Long userId, @RequestHeader HttpHeaders headers) {
        String token = headers.getFirst("Authorization");
        List<UserDTO> followers = userService.findFollowersOf(userId);

        if (token != null) {
            token = token.replace("Bearer ", "");
            String loggedUsername = tokenService.validateToken(token);
            followers = followers.stream().map( follower ->
                    follower.withFollowing(userService.isFollowing(follower.id(), loggedUsername))).toList();
        }

        return new ResponseEntity<>(followers, HttpStatus.OK);
    }
    @GetMapping("/following/{userId}")
    public ResponseEntity<List<UserDTO>> getFollowingOf(@PathVariable Long userId, @RequestHeader HttpHeaders headers) {
        String token = headers.getFirst("Authorization");
        List<UserDTO> following = userService.findFollowingOf(userId);
        if (token != null) {
            token = token.replace("Bearer ", "");
            String loggedUsername = tokenService.validateToken(token);
            following = following.stream().map( follow ->
                    follow.withFollowing(userService.isFollowing(follow.id(), loggedUsername))).toList();
        }

        return new ResponseEntity<>(following, HttpStatus.OK);
    }


    @PostMapping("/follow/{username}")
    public ResponseEntity<UserDTO> followUser(@PathVariable String username, @RequestHeader HttpHeaders headers) throws UserNotFoundException {
        String token = headers.getFirst("Authorization").replace("Bearer ", "");
        String fromUsername = tokenService.validateToken(token);
        UserDTO toUser = userService.followUser(fromUsername, username);
        return new ResponseEntity<>(toUser, HttpStatus.OK);
    }
    @DeleteMapping("/follow/{username}")
    public ResponseEntity<UserDTO> unfollowUser(@PathVariable String username, @RequestHeader HttpHeaders headers) throws UserNotFoundException {
        String token = headers.getFirst("Authorization").replace("Bearer ", "");
        String fromUsername = tokenService.validateToken(token);
        UserDTO toUser = userService.unfollowUser(fromUsername, username);
        return new ResponseEntity<>(toUser, HttpStatus.OK);
    }

}
