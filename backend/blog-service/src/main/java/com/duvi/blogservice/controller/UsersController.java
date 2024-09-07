package com.duvi.blogservice.controller;


import com.duvi.blogservice.config.security.TokenService;
import com.duvi.blogservice.model.User;
import com.duvi.blogservice.model.dto.*;
import com.duvi.blogservice.model.exceptions.EntityAlreadyExistsException;
import com.duvi.blogservice.model.exceptions.EntityDoesNotExistsException;
import com.duvi.blogservice.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;

import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

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
    public ResponseEntity<UserResponseDTO> currentUser(@RequestHeader HttpHeaders headers) throws EntityDoesNotExistsException {
        String bearerToken = headers.get("Authorization").getFirst();
        String token = bearerToken.replace("Bearer ", "");
        String username = tokenService.validateToken(token);
        UserResponseDTO user = userService.findUserByUsername(username);

        return new ResponseEntity<>(user, HttpStatus.OK);
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
    @PutMapping(value = "/", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<AuthResponseDTO> updateUser(
            @RequestParam("username") String username,
            @RequestParam("email") String email,
            @RequestParam("bio") String bio,
            @RequestParam(value = "image", required = false) MultipartFile image,
            @RequestParam(value = "backgroundImage", required = false) MultipartFile backgroundImage,
            @RequestParam("icon") String icon,
            @RequestParam("backgroundColor") String backgroundColor,
            @RequestHeader HttpHeaders headers ) throws EntityAlreadyExistsException {

        SetUserDTO newUserDTO = new SetUserDTO(username, email, bio, image, backgroundImage, icon, backgroundColor);
        String token = headers.getFirst("Authorization").replace("Bearer ", "");

        String oldUsername = tokenService.validateToken(token);

        UserResponseDTO userResponseDTO = userService.updateUser(oldUsername, newUserDTO);

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User principal = (User) authentication.getPrincipal();
        principal.setUsername(newUserDTO.username());

        String newToken = tokenService.generateToken(principal);

        AuthResponseDTO authResponse = new AuthResponseDTO(newToken, userResponseDTO);

        return new ResponseEntity<>(authResponse, HttpStatus.OK);
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
    @GetMapping("/oauth2/{client}")
    public void oauth2Provider(@PathVariable String client, HttpServletResponse response) throws EntityDoesNotExistsException {

        response.setStatus(302);
        response.setHeader("Location", "/oauth2/authorization/" + client);
    }
    @GetMapping("/oauth2/redirect")
    public void oauth2Redirect(OAuth2AuthenticationToken oauth2Token, HttpServletRequest request, HttpServletResponse response) throws EntityDoesNotExistsException {
        HttpSession httpSession = request.getSession();
        OAuth2User oauth2User = oauth2Token.getPrincipal();
        httpSession.setAttribute("oauth2Principal", oauth2User);
        response.setStatus(302);
        response.setHeader("Location", "http://localhost:5173/dmblog/register");
    }

    @GetMapping("/oauth2/check")
    public ResponseEntity<AuthResponseDTO> oauth2Check(HttpServletRequest request, HttpServletResponse response) throws EntityDoesNotExistsException {
        HttpSession httpSession = request.getSession();
        OAuth2User oauth2User = (OAuth2User) httpSession.getAttribute("oauth2Principal");
        String email = oauth2User.getAttribute("email");
        String username = oauth2User.getAttribute("login");
        UserResponseDTO userDTO;
        String token = "";
        try {
            User user = userService.findUserByEmail(email);
            userDTO = userService.createDTO(user);
            token = tokenService.generateToken(user);

        } catch (EntityDoesNotExistsException exception) {
            userDTO = new UserResponseDTO(null, username, email, "", "", "", "", "", null, null, null, null, null);
        }
        AuthResponseDTO authResponseDTO = new AuthResponseDTO(token, userDTO);
        return new ResponseEntity<>(authResponseDTO, HttpStatus.OK);
    }

}
