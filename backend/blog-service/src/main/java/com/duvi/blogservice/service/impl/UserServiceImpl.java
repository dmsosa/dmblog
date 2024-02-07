package com.duvi.blogservice.service.impl;

import com.duvi.blogservice.model.User;
import com.duvi.blogservice.model.dto.UserDTO;
import com.duvi.blogservice.model.exceptions.UserAlreadyExistsException;
import com.duvi.blogservice.repository.UserRepository;
import com.duvi.blogservice.service.UserService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    private UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public User createUser(UserDTO userDTO) throws UserAlreadyExistsException {
        return null;
    }

    @Override
    public User findUserByUsername() {
        return null;
    }
}
