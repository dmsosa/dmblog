package com.duvi.blogservice.service;

import com.duvi.blogservice.model.User;
import com.duvi.blogservice.model.dto.UserDTO;
import com.duvi.blogservice.model.exceptions.UserAlreadyExistsException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface UserService {

    List<User> getAllUsers();
    User createUser(UserDTO userDTO) throws UserAlreadyExistsException;
    User findUserByUsername();
}
