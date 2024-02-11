package com.duvi.blogservice.controller;


import com.duvi.blogservice.config.security.TokenService;
import com.duvi.blogservice.model.User;
import com.duvi.blogservice.model.dto.AuthResponseDTO;
import com.duvi.blogservice.model.dto.LoginDTO;
import com.duvi.blogservice.model.dto.RegisterDTO;
import com.duvi.blogservice.model.dto.UserDTO;
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
        UserDTO createdUser = userService.createUser(registerDTO);
        var usernamePassword = new UsernamePasswordAuthenticationToken(createdUser.username(), createdUser.password());
        Authentication auth = authenticationManager.authenticate(usernamePassword);
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
}
