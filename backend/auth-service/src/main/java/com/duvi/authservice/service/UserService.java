package com.duvi.authservice.service;

import com.duvi.authservice.model.User;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public interface UserService {
    public User findUserById(Long id);
    public User findUserByUsername(String username);
    public User findByEmail(String email);
    public User findByLogin(String login);
    public User saveUser(User user);
    public User updateUser(Long oldUserId, User updatedUser);
    public void deleteUserById(Long id);
    boolean existsByUsername(String username);
    boolean existsByEmail(String email);

}
