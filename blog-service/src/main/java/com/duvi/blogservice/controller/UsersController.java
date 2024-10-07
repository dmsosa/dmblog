package com.duvi.blogservice.controller;


import com.duvi.blogservice.config.security.TokenService;
import com.duvi.blogservice.model.User;
import com.duvi.blogservice.model.dto.*;
import com.duvi.blogservice.model.exceptions.EntityAlreadyExistsException;
import com.duvi.blogservice.model.exceptions.EntityDoesNotExistsException;
import com.duvi.blogservice.service.UserService;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.oauth2.client.CommonOAuth2Provider;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;

import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import org.springframework.web.servlet.view.RedirectView;

import java.util.Arrays;
import java.util.List;
import java.util.Objects;


@RestController
@RequestMapping("/api/users")
public class UsersController {


    private AuthenticationManager authenticationManager;
    private UserService userService;
    private TokenService tokenService;

    public UsersController(
                            UserService userService,
                           AuthenticationManager authenticationManager,
                           TokenService tokenService
    ) {
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
        UsernamePasswordAuthenticationToken usernamePassword = new UsernamePasswordAuthenticationToken(loggedUser.username(), loginDTO.password());
        Authentication auth = authenticationManager.authenticate(usernamePassword);

        String token = tokenService.generateToken(loggedUser.username(), loggedUser.email());
        AuthResponseDTO responseDTO = new AuthResponseDTO(token, loggedUser);
        return new ResponseEntity<>(responseDTO, HttpStatus.OK);
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponseDTO> registerUser(@RequestBody RegisterDTO registerDTO) throws EntityAlreadyExistsException {
        //User service will check if username and email are available, and
        // encrypt the password before storing the new user into the database
        UserResponseDTO createdUser = userService.createUser(registerDTO);
        var authToken = new UsernamePasswordAuthenticationToken(createdUser.username(), registerDTO.password());
        Authentication auth = authenticationManager.authenticate(authToken);
        User user = (User) auth.getPrincipal();
        String token = tokenService.generateToken(user.getUsername(), user.getEmail());
        UserResponseDTO userResponseDTO = userService.createDTO((User) auth.getPrincipal());
        AuthResponseDTO responseDTO = new AuthResponseDTO(token, userResponseDTO);
        return new ResponseEntity<>(responseDTO, HttpStatus.OK);
    }

//OAuth2 Requests and Redirect endpoint

    //Redirect to our frontEnd with user info ready to sign up

    @GetMapping("/")
    public ResponseEntity<List<UserResponseDTO>> getAllUsers(Authentication authentication) {
        List<UserResponseDTO> users = userService.getAllUsers();
        if (Objects.nonNull(authentication) && authentication.isAuthenticated()) {
            User authenticatedUser = (User) authentication.getPrincipal();
            users = users.stream().map(userDTO ->
                userDTO.withFollowing(
                        userService.isFollowing(userDTO.id(), authenticatedUser.getUsername())
                )
            ).toList();
        }
        return new ResponseEntity<>(users, HttpStatus.OK);
    }
    @GetMapping("/find/{userId}")
    public ResponseEntity<UserResponseDTO> getUserById(@PathVariable Long userId, Authentication authentication) throws EntityDoesNotExistsException {
        UserResponseDTO userResponseDTO = userService.findUserById(userId);
        if (Objects.nonNull(authentication) && authentication.isAuthenticated()) {
            User authenticatedUser = (User) authentication.getPrincipal();
            userResponseDTO = userResponseDTO.withFollowing(userService.isFollowing(userResponseDTO.id(), authenticatedUser.getUsername()));
        }
        return new ResponseEntity<>(userResponseDTO, HttpStatus.OK);
    }

    @GetMapping("/{username}")
    public ResponseEntity<UserResponseDTO> getUserByUsername(@PathVariable String username, Authentication authentication) throws EntityDoesNotExistsException {
        UserResponseDTO userResponseDTO = userService.findUserByUsername(username);
        if (Objects.nonNull(authentication) && authentication.isAuthenticated()) {
            User authenticatedUser = (User) authentication.getPrincipal();
            userResponseDTO = userResponseDTO.withFollowing(userService.isFollowing(userResponseDTO.id(), authenticatedUser.getUsername()));
        }
        return new ResponseEntity<>(userResponseDTO, HttpStatus.OK);
    }
    @PutMapping(value = "", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<AuthResponseDTO> updateUser(
            @RequestParam("username") String username,
            @RequestParam("email") String email,
            @RequestParam("bio") String bio,
            @RequestParam(value = "image", required = false) MultipartFile image,
            @RequestParam(value = "backgroundImage", required = false) MultipartFile backgroundImage,
            @RequestParam("icon") String icon,
            @RequestParam("backgroundColor") String backgroundColor,
            @RequestHeader HttpHeaders headers ) throws EntityAlreadyExistsException {

        SetUserDTO updatedUserDTO = new SetUserDTO(username, email, bio, image, backgroundImage, icon, backgroundColor);
        String token = headers.getFirst("Authorization").replace("Bearer ", "");

        String oldUsername = tokenService.validateToken(token);
        UserResponseDTO userDTO = userService.updateUser(oldUsername, updatedUserDTO);

        Authentication oldAuthentication = SecurityContextHolder.getContext().getAuthentication();
        User authenticatedUser = (User) oldAuthentication.getPrincipal();

        UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(authenticatedUser.getUsername(), authenticatedUser.getPassword());
        Authentication newAuthentication = authenticationManager.authenticate(auth);

        SecurityContextHolder.getContext().setAuthentication(newAuthentication);

        String newToken = tokenService.generateToken(userDTO.username(), userDTO.email());
        AuthResponseDTO authResponse = new AuthResponseDTO(newToken, userDTO);

        return new ResponseEntity<>(authResponse, HttpStatus.OK);
    }
    @GetMapping("/followers/{userId}")
    public ResponseEntity<List<UserResponseDTO>> getFollowersOf(@PathVariable Long userId, Authentication authentication) {
        List<UserResponseDTO> followers = userService.findFollowersOf(userId);
        if (Objects.nonNull(authentication) && authentication.isAuthenticated()) {
            User authenticatedUser = (User) authentication.getPrincipal();
            followers = followers.stream().map(userDTO ->
                    userDTO.withFollowing(
                            userService.isFollowing(userDTO.id(), authenticatedUser.getUsername())
                    )
            ).toList();
        }
        return new ResponseEntity<>(followers, HttpStatus.OK);
    }
    @GetMapping("/following/{userId}")
    public ResponseEntity<List<UserResponseDTO>> getFollowingOf(@PathVariable Long userId, Authentication authentication) {
        List<UserResponseDTO> following = userService.findFollowingOf(userId);
        if (Objects.nonNull(authentication) && authentication.isAuthenticated()) {
            User authenticatedUser = (User) authentication.getPrincipal();
            following = following.stream().map(userDTO ->
                    userDTO.withFollowing(
                            userService.isFollowing(userDTO.id(), authenticatedUser.getUsername())
                    )
            ).toList();
        }
        return new ResponseEntity<>(following, HttpStatus.OK);
    }


    @PostMapping("/follow/{username}")
    public ResponseEntity<UserResponseDTO> followUser(@PathVariable String username, Authentication authentication) throws EntityDoesNotExistsException {
        User currentUser = (User) authentication.getPrincipal();
        UserResponseDTO userDTO = userService.followUser(username, currentUser.getUsername());

        return new ResponseEntity<>(userDTO, HttpStatus.OK);
    }
    @DeleteMapping("/follow/{username}")
    public ResponseEntity<UserResponseDTO> unfollowUser(@PathVariable String username, Authentication authentication) throws EntityDoesNotExistsException {
        User currentUser = (User) authentication.getPrincipal();
        UserResponseDTO userDTO = userService.unfollowUser(username, currentUser.getUsername());

        return new ResponseEntity<>(userDTO, HttpStatus.OK);
    }
    @GetMapping("/oauth2/{clientProvider}")
    public void oauth2ClientProvider(
            @PathVariable String clientProvider,
            HttpServletResponse response) throws EntityDoesNotExistsException {
        try {
            CommonOAuth2Provider oAuth2Provider = Arrays.stream(CommonOAuth2Provider.values()).filter(provider -> Objects.equals(provider.name(), clientProvider.toUpperCase())).toList().getFirst();
        } catch (Exception e) {
            throw new EntityDoesNotExistsException("OAuth2Provider can not be null and the given provider name does not exist!" );
        }

        response.setStatus(302);
        response.setHeader("Location", "/oauth2/authorization/" + clientProvider);
    }
    @GetMapping("/oauth2/redirect")
    public RedirectView oauth2Redirect(OAuth2AuthenticationToken oauth2Token,
                                       RedirectAttributes redirectAttributes)   {
        String token;
        OAuth2User oauth2User = oauth2Token.getPrincipal();
        String email = oauth2User.getAttribute("email");
        String username = oauth2User.getAttribute("name");
        try {
            UserResponseDTO userDTO = userService.findUserByEmail(email);
            token = tokenService.generateToken(userDTO.username(), userDTO.email());
            redirectAttributes.addAttribute("token", token);
        } catch (EntityDoesNotExistsException e) {
            //ignore
        }
        redirectAttributes.addAttribute("email", email);
        redirectAttributes.addAttribute("username", username);
        return new RedirectView("http://localhost:5173/register");
    }



}
