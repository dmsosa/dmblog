package com.duvi.blogservice.service;

import com.duvi.blogservice.model.User;
import com.duvi.blogservice.model.dto.RegisterDTO;
import com.duvi.blogservice.model.dto.UserDTO;
import com.duvi.blogservice.model.exceptions.UserAlreadyExistsException;
import com.duvi.blogservice.model.exceptions.UserNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface UserService {

    //    endpoints
//    /login current user and login
//    /register register user
//      /{userid} get user by id, edit user, delete user
//    /follow/{id} get all followers of userId
//    /follow?toId post: follow user delete unfollow user
//    /follow?fromId get all followedByUser

    UserDTO createDTO(User user);
    List<UserDTO> getAllUsers();
    UserDTO createUser(RegisterDTO userDTO) throws UserAlreadyExistsException;
    UserDTO editUser(Long oldUserId, UserDTO userDTO);
    void deleteUser(Long userId) throws UserNotFoundException;
    UserDTO findUserById(Long userId) throws UserNotFoundException;
    UserDTO findUserByUsername(String username) throws UserNotFoundException;
    UserDTO followUser(Long fromId, Long toId) throws UserNotFoundException;
    UserDTO unfollowUser(Long fromId, Long toId) throws UserNotFoundException;
    public List<UserDTO> findUsersByFollowersId(Long followerId);

}
