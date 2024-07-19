package com.duvi.blogservice.controller;


import com.duvi.blogservice.config.security.TokenService;
import com.duvi.blogservice.model.User;
import com.duvi.blogservice.model.dto.*;
import com.duvi.blogservice.model.exceptions.EntityAlreadyExistsException;
import com.duvi.blogservice.model.exceptions.EntityDoesNotExistsException;
import com.duvi.blogservice.service.UserService;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.oidc.user.DefaultOidcUser;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;


@RestController
@RequestMapping("/api/users")
public class UsersController {

    private Environment env;
    private Logger logger = LoggerFactory.getLogger(this.getClass());
    private AuthenticationManager authenticationManager;
    private UserService userService;
    private TokenService tokenService;

    public UsersController(
                            Environment env,
                            UserService userService,
                           AuthenticationManager authenticationManager,
                           TokenService tokenService
    ) {
        this.env = env;
        this.userService = userService;
        this.authenticationManager = authenticationManager;
        this.tokenService = tokenService;
    }




    @GetMapping("/current")
    public ResponseEntity<AuthResponseDTO> currentUser(@RequestHeader HttpHeaders headers) throws EntityDoesNotExistsException {
        String bearerToken = headers.get("Authorization").getFirst();
        String token = bearerToken.replace("Bearer ", "");
        String username = tokenService.validateToken(token);
        UserResponseDTO user = userService.findUserByUsername(username);
        user = user.withFollowing(userService.isFollowing(user.id(), username));
        AuthResponseDTO response = new AuthResponseDTO(token, user);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponseDTO> loginUser(@RequestBody LoginDTO loginDTO) throws EntityDoesNotExistsException {
        if (!userService.existsByLogin(loginDTO.login())) {
            throw new EntityDoesNotExistsException("User with login '%s' do not exists!".formatted(loginDTO.login()));
        }
        UserResponseDTO loggedUser = userService.findUserByLogin(loginDTO.login());
        var usernamePassword = new UsernamePasswordAuthenticationToken(loggedUser.username(), loginDTO.password());
        Authentication auth = authenticationManager.authenticate(usernamePassword);
        User user = (User) auth.getPrincipal();
        String token = tokenService.generateToken(user);
        UserResponseDTO userResponseDTO = userService.createDTO(user);
        AuthResponseDTO responseDTO = new AuthResponseDTO(token, userResponseDTO);
        return new ResponseEntity<>(responseDTO, HttpStatus.OK);
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponseDTO> registerUser(@RequestBody RegisterDTO registerDTO) throws EntityAlreadyExistsException {
        //User service will check if username and email are available, and
        // encrypt the password before storing the new user into the database
        UserResponseDTO createdUser = userService.createUser(registerDTO);
        var authToken = new UsernamePasswordAuthenticationToken(createdUser.username(), registerDTO.password());
        Authentication auth = authenticationManager.authenticate(authToken);
        String token = tokenService.generateToken((User) auth.getPrincipal());
        UserResponseDTO userResponseDTO = userService.createDTO((User) auth.getPrincipal());
        AuthResponseDTO responseDTO = new AuthResponseDTO(token, userResponseDTO);
        return new ResponseEntity<>(responseDTO, HttpStatus.OK);
    }

//OAuth2 Requests and Redirect endpoint

    //Redirect to our frontEnd with user info ready to sign up
    @GetMapping("/redirect")
    public void redirect(HttpServletResponse httpServletResponse, Principal principal) {
        String username = "";
        String email = "";
        String image = "";

        if (!(principal instanceof OAuth2AuthenticationToken)) {
            return;
        }
        OAuth2AuthenticationToken authenticationToken = (OAuth2AuthenticationToken) principal;
        if (authenticationToken.getPrincipal() instanceof DefaultOidcUser) {

            DefaultOidcUser defaultOidcUser = (DefaultOidcUser) authenticationToken.getPrincipal();

            username = (String) defaultOidcUser.getAttributes().get("name");
            email = defaultOidcUser.getEmail();
            image = defaultOidcUser.getPicture();

        } else {

            DefaultOAuth2User defaultOAuth2User = (DefaultOAuth2User) authenticationToken.getPrincipal();


            username = (String) defaultOAuth2User.getAttributes().get("name");
            email = (String) defaultOAuth2User.getAttributes().get("email");
            image = (String) defaultOAuth2User.getAttributes().get("avatar_url");

        }
        String redirectUri = "http://localhost:5173//signup";
        String redirectParams = "?description=registration_credentials&username=%1$s&email=%2$s&image=%3$s"
                .formatted(username, email, image);
        httpServletResponse.setStatus(302);
        httpServletResponse.setHeader("Location", redirectUri + redirectParams);
    }



    @GetMapping("/")
    public ResponseEntity<List<UserResponseDTO>> getAllUsers(@RequestHeader HttpHeaders headers) {
        String token = headers.getFirst("Authorization");
        List<UserResponseDTO> users = userService.getAllUsers();

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
    public ResponseEntity<UserResponseDTO> getUserById(@PathVariable Long userId, @RequestHeader HttpHeaders headers) throws EntityDoesNotExistsException {
        String token = headers.getFirst("Authorization");
        UserResponseDTO user = userService.findUserById(userId);

        if (token != null) {
            token = token.replace("Bearer ", "");
            String loggedUsername = tokenService.validateToken(token);
            user = user.withFollowing(userService.isFollowing(user.id(), loggedUsername));
        }
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @GetMapping("/{username}")
    public ResponseEntity<UserResponseDTO> getUserByUsername(@PathVariable String username, @RequestHeader HttpHeaders headers) throws EntityDoesNotExistsException {
        String token = headers.getFirst("Authorization");
        UserResponseDTO userResponseDTO = userService.findUserByUsername(username);

        if (token != null) {
            token = token.replace("Bearer ", "");
            String loggedUsername = tokenService.validateToken(token);
            userResponseDTO = userResponseDTO.withFollowing(userService.isFollowing(userResponseDTO.id(), loggedUsername));
        }
        return new ResponseEntity<>(userResponseDTO, HttpStatus.OK);
    }
    @PutMapping("/")
    public ResponseEntity<UserResponseDTO> updateUser(@RequestBody SetUserDTO newUserDTO, @RequestHeader HttpHeaders headers ) throws EntityAlreadyExistsException {
        String token = headers.getFirst("Authorization").replace("Bearer ", "");
        String username = tokenService.validateToken(token);

        UserResponseDTO userResponseDTO = userService.updateUser(username, newUserDTO);

        return new ResponseEntity<>(userResponseDTO, HttpStatus.OK);
    }
    @GetMapping("/followers/{userId}")
    public ResponseEntity<List<UserResponseDTO>> getFollowersOf(@PathVariable Long userId, @RequestHeader HttpHeaders headers) {
        String token = headers.getFirst("Authorization");
        List<UserResponseDTO> followers = userService.findFollowersOf(userId);

        if (token != null) {
            token = token.replace("Bearer ", "");
            String loggedUsername = tokenService.validateToken(token);
            followers = followers.stream().map( follower ->
                    follower.withFollowing(userService.isFollowing(follower.id(), loggedUsername))).toList();
        }

        return new ResponseEntity<>(followers, HttpStatus.OK);
    }
    @GetMapping("/following/{userId}")
    public ResponseEntity<List<UserResponseDTO>> getFollowingOf(@PathVariable Long userId, @RequestHeader HttpHeaders headers) {
        String token = headers.getFirst("Authorization");
        List<UserResponseDTO> following = userService.findFollowingOf(userId);
        if (token != null) {
            token = token.replace("Bearer ", "");
            String loggedUsername = tokenService.validateToken(token);
            following = following.stream().map( follow ->
                    follow.withFollowing(userService.isFollowing(follow.id(), loggedUsername))).toList();
        }

        return new ResponseEntity<>(following, HttpStatus.OK);
    }


    @PostMapping("/follow/{username}")
    public ResponseEntity<UserResponseDTO> followUser(@PathVariable String username, @RequestHeader HttpHeaders headers) throws EntityDoesNotExistsException {
        String token = headers.getFirst("Authorization").replace("Bearer ", "");
        String fromUsername = tokenService.validateToken(token);
        UserResponseDTO toUser = userService.followUser(fromUsername, username);
        return new ResponseEntity<>(toUser, HttpStatus.OK);
    }
    @DeleteMapping("/follow/{username}")
    public ResponseEntity<UserResponseDTO> unfollowUser(@PathVariable String username, @RequestHeader HttpHeaders headers) throws EntityDoesNotExistsException {
        String token = headers.getFirst("Authorization").replace("Bearer ", "");
        String fromUsername = tokenService.validateToken(token);
        UserResponseDTO toUser = userService.unfollowUser(fromUsername, username);
        return new ResponseEntity<>(toUser, HttpStatus.OK);
    }


}
