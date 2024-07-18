package com.duvi.blogservice.service;

import com.duvi.blogservice.model.User;
import com.duvi.blogservice.model.dto.RegisterDTO;
import com.duvi.blogservice.model.dto.SetUserDTO;
import com.duvi.blogservice.model.dto.UserResponseDTO;
import com.duvi.blogservice.model.exceptions.EntityAlreadyExistsException;
import com.duvi.blogservice.model.exceptions.EntityDoesNotExistsException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface UserService {

    //Booleans
    boolean existsByLogin(String login);
    boolean existsByUsername(String username);
    boolean existsByEmail(String email);
    boolean isFollowing(Long userId, String loggedUsername);

    //Create DTOS
    UserResponseDTO createDTO(User user);

    //Basic CRUD
    List<UserResponseDTO> getAllUsers();
    UserResponseDTO createUser(RegisterDTO userDTO) throws EntityAlreadyExistsException;
    UserResponseDTO findUserById(Long userId) throws EntityDoesNotExistsException;
    UserResponseDTO findUserByUsername(String username) throws EntityDoesNotExistsException;
    UserResponseDTO findUserByEmail(String email) throws EntityDoesNotExistsException;
    //Login look for Username and Email at once
    UserResponseDTO findUserByLogin(String login) throws EntityDoesNotExistsException;
    UserResponseDTO updateUser(String oldUsername, SetUserDTO userDTO) throws EntityAlreadyExistsException;
    void deleteUser(Long userId) throws EntityDoesNotExistsException;

    //Operations with Followers
    UserResponseDTO followUser(String fromUsername, String toUsername) throws EntityDoesNotExistsException;
    UserResponseDTO unfollowUser(String fromUsername, String toUsername) throws EntityDoesNotExistsException;
    public Integer findFollowersCount(Long userId);

    public List<UserResponseDTO> findFollowersOf(Long userId);
    public Integer findFollowingCount(Long userId);
    public List<UserResponseDTO> findFollowingOf(Long userId);

}
