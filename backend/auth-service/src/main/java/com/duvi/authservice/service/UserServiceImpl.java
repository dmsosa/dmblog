package com.duvi.authservice.service;

import com.duvi.authservice.model.User;
import com.duvi.authservice.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserServiceImpl implements UserService{
    @Autowired
    UserRepository userRepository;

    @Override
    public User findUserById(Long id) {
        Optional<User> optionalUser = userRepository.findById(id);
        if (optionalUser.isEmpty()) {
            return null;
        }
        return optionalUser.get();
    }

    //Zu Machen: EXCEPTIONS
    @Override
    public User findUserByUsername(String username) {
        User user = (User) userRepository.findByUsername(username);
        if (user == null) {
            return null;
        }
        return user;
    }

    @Override
    public User findByEmail(String email) {
        Optional<User> optionalUser = userRepository.findByEmail(email);
        if (optionalUser.isEmpty()) {
            return null;
        }
        return optionalUser.get();
    }

    @Override
    public User findByLogin(String login) {
        User user = this.findUserByUsername(login);
        if (user == null){
            Optional<User> optUser = userRepository.findByEmail(login);
            return optUser.get();
        }
        return user;
    }

    @Override
    public User saveUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public User updateUser(Long oldUserId, User updatedUser) {
        Optional<User> oldUser = userRepository.findById(oldUserId);
        if (oldUser.isEmpty()) {
            User newUser = userRepository.save(updatedUser);
            return newUser;
        }
        oldUser.get().updateWithUser(updatedUser);
        User newUser = userRepository.save(oldUser.get());
        return newUser;
    }

    @Override
    public void deleteUserById(Long id) {

    }

    @Override
    public boolean existsByUsername(String username) {
        return userRepository.existsByUsername(username);
    }

    @Override
    public boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }
}
