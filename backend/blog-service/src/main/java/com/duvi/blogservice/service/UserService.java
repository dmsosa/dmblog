package com.duvi.blogservice.service;

import com.duvi.blogservice.model.User;
import com.duvi.blogservice.model.dto.RegisterDTO;
import com.duvi.blogservice.model.dto.SetUserDTO;
import com.duvi.blogservice.model.dto.UserDTO;
import com.duvi.blogservice.model.exceptions.UserAlreadyExistsException;
import com.duvi.blogservice.model.exceptions.UserNotFoundException;
import com.duvi.blogservice.model.relations.UserFollower;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface UserService {

    //Booleans
    boolean existsByLogin(String login);
    boolean existsByUsername(String username);
    boolean existsByEmail(String email);

    //Create DTOS
    UserDTO createDTO(User user);

    //Basic CRUD
    List<UserDTO> getAllUsers();
    UserDTO createUser(RegisterDTO userDTO) throws UserAlreadyExistsException;
    UserDTO findUserById(Long userId) throws UserNotFoundException;
    UserDTO findUserByUsername(String username) throws UserNotFoundException;
    UserDTO findUserByEmail(String email) throws UserNotFoundException;
    //Login look for Username and Email at once
    UserDTO findUserByLogin(String login) throws UserNotFoundException;
    UserDTO updateUser(String oldUsername, SetUserDTO userDTO);
    void deleteUser(Long userId) throws UserNotFoundException;

    //Operations with Followers
    void followUser(Long fromId, Long toId) throws UserNotFoundException;
    void unfollowUser(Long fromId, Long toId) throws UserNotFoundException;
    public Integer findFollowersCount(Long userId);

    public List<UserDTO> findFollowersOf(Long userId);
    public Integer findFollowingCount(Long userId);
    public List<UserDTO> findFollowingOf(Long userId);
    public List<Long> findFollowingIdsOf(Long userId) throws UserNotFoundException;

}
