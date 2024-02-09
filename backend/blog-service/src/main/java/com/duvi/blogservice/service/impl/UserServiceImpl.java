package com.duvi.blogservice.service.impl;

import com.duvi.blogservice.model.Article;
import com.duvi.blogservice.model.User;
import com.duvi.blogservice.model.dto.RegisterDTO;
import com.duvi.blogservice.model.dto.UserDTO;
import com.duvi.blogservice.model.exceptions.ArticleDoNotExistsException;
import com.duvi.blogservice.model.exceptions.UserAlreadyExistsException;
import com.duvi.blogservice.model.exceptions.UserNotFoundException;
import com.duvi.blogservice.repository.UserRepository;
import com.duvi.blogservice.service.UserService;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class UserServiceImpl implements UserService {

    private UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDTO createDTO(User user) {
        Integer followersCount = user.getFollowers().size();
        Integer followingCount =
    }
    @Override
    public List<UserDTO> getAllUsers() {
        List<User> userList = userRepository.findAll();
        List<UserDTO> userDTOS = userList.stream().map((user) -> {})

    }

    @Override
    public UserDTO createUser(RegisterDTO userDTO) throws UserAlreadyExistsException {
        if (userRepository.existsByUsername(userDTO.username())) {
            throw new UserAlreadyExistsException("User with username %s already exists!".formatted(userDTO.username()));
        }
        User user = new User(userDTO);
        return userRepository.save(user);
    }

    @Override
    public UserDTO editUser(Long oldUserId, UserDTO userDTO) {
        User oldUser = userRepository.findById(oldUserId).get();
        oldUser.updateUser(userDTO.username(), userDTO.email(), userDTO.image(), userDTO.bio());
        return userRepository.save(oldUser);
    }

    @Override
    public void deleteUser(Long userId) throws UserNotFoundException {
        if (!userRepository.existsById(userId)) {
            throw new UserNotFoundException(userId);
        }
        userRepository.delete(userRepository.findById(userId).get());
    }

    @Override
    public UserDTO findUserById(Long userId) throws UserNotFoundException {
        if (!userRepository.existsById(userId)) {
            throw new UserNotFoundException(userId);
        }
        return userRepository.findById(userId).get();
    }

    @Override
    public UserDTO findUserByUsername(String username) throws UserNotFoundException {
        Optional<User> optUser = userRepository.findByUsername(username);
        if (optUser.isEmpty()) {
            throw new UserNotFoundException("User with username '%s' do not exists!".formatted(username));
        }
        return optUser.get();
    }

    @Override
    public UserDTO followUser(Long fromId, Long toId) throws UserNotFoundException {
        if (!userRepository.existsById(toId)) {
            throw new UserNotFoundException(toId);
        };
        User userToFollow = userRepository.findById(toId).get();
        User userFromFollow = userRepository.findById(fromId).get();
        Set<User> followers = userToFollow.getFollowers();
        if (followers.isEmpty()) {
            Set<User> newFollowers = new HashSet<>();
            newFollowers.add(userFromFollow);
            userToFollow.setFollowers(newFollowers);
        } else {
            followers.add(userFromFollow);
        }
        return
    }

    @Override
    public UserDTO unfollowUser(Long fromId, Long toId) throws UserNotFoundException {
        return null;
    }

    public List<UserDTO> findUsersByFollowersId(Long id) {
        return userRepository.findUserByFollowerId(id);
    }
}
