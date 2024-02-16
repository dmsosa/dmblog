package com.duvi.blogservice.service.impl;

import com.duvi.blogservice.model.User;
import com.duvi.blogservice.model.dto.RegisterDTO;
import com.duvi.blogservice.model.dto.UserDTO;
import com.duvi.blogservice.model.exceptions.UserAlreadyExistsException;
import com.duvi.blogservice.model.exceptions.UserNotFoundException;
import com.duvi.blogservice.model.relations.UserFollower;
import com.duvi.blogservice.model.relations.UserFollowerId;
import com.duvi.blogservice.repository.UserRepository;
import com.duvi.blogservice.repository.relations.UserFollowerRepository;
import com.duvi.blogservice.service.UserService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    private UserRepository userRepository;
    private UserFollowerRepository followersRepository;

    public UserServiceImpl(UserRepository userRepository, UserFollowerRepository followersRepository) {

        this.userRepository = userRepository;
        this.followersRepository = followersRepository;
    }

    //Create DTOS
    @Override
    public UserDTO createDTO(User user) {
        Integer followingCount = this.findFollowingCount(user.getId());
        Integer followersCount = this.findFollowersCount(user.getId());
        return new UserDTO(user.getId(), user.getUsername(),
                user.getEmail(), user.getPassword(),
                user.getBio(), user.getImage(),
                followersCount, followingCount,
                user.getCreatedAt(), user.getUpdatedAt());
    }

    //Basic CRUD
        //GET
    @Override
    public List<UserDTO> getAllUsers() {
        List<User> userList = userRepository.findAll();
        List<UserDTO> userDTOS = userList.stream().map(this::createDTO).toList();
        return userDTOS;
    }
    @Override
    public UserDTO findUserById(Long userId) throws UserNotFoundException {
        if (!userRepository.existsById(userId)) {
            throw new UserNotFoundException(userId);
        }
        User user = userRepository.findById(userId).get();
        return createDTO(user);
    }

    @Override
    public UserDTO findUserByUsername(String username) throws UserNotFoundException {
        Optional<User> optUser = userRepository.findByUsername(username);
        if (optUser.isEmpty()) {
            throw new UserNotFoundException("User with username '%s' do not exists!".formatted(username));
        }
        return createDTO(optUser.get());
    }

    @Override
    public UserDTO findUserByEmail(String email) throws UserNotFoundException {
        Optional<User> optUser = userRepository.findByEmail(email);
        if (optUser.isEmpty()) {
            throw new UserNotFoundException("User with email '%s' do not exists!".formatted(email));
        }
        return createDTO(optUser.get());
    }

    @Override
    public UserDTO findUserByLogin(String login) throws UserNotFoundException {

        if (!(userRepository.existsByUsername(login) || userRepository.existsByEmail(login))) {
            throw new UserNotFoundException("User with login '%s' do not exists!".formatted(login));
        }
        Optional<User> optUser = userRepository.findByEmail(login);
        if (optUser.isEmpty()) {
            optUser = userRepository.findByUsername(login);
        }
        return createDTO(optUser.get());
    }

    @Override
    public boolean existsByLogin(String login) {
        return (userRepository.existsByUsername(login) || userRepository.existsByEmail(login));
    }

    @Override
    public boolean existsByUsername(String username) {
        return (userRepository.existsByUsername(username));
    }

    @Override
    public boolean existsByEmail(String email) {
        return (userRepository.existsByEmail(email));
    }

    //POST
    @Override
    public UserDTO createUser(RegisterDTO userDTO) throws UserAlreadyExistsException {
        if (userRepository.existsByUsername(userDTO.username())) {
            throw new UserAlreadyExistsException("User with username %s already exists!".formatted(userDTO.username()));
        }
        if (userRepository.existsByEmail(userDTO.email())) {
            throw new UserAlreadyExistsException("User with email %s already exists!".formatted(userDTO.email()));
        }

        String encryptedPassword = new BCryptPasswordEncoder().encode(userDTO.password());
        User createdUser = new User(userDTO, encryptedPassword);

        userRepository.save(createdUser);
        return createDTO(createdUser);
    }
        //PUT
    @Override
    public UserDTO editUser(Long oldUserId, UserDTO userDTO) {
        User oldUser = userRepository.findById(oldUserId).get();
        oldUser.updateUser(userDTO.username(), userDTO.email(), userDTO.image(), userDTO.bio());
        userRepository.save(oldUser);
        return createDTO(oldUser);
    }
        //DELETE
    @Override
    public void deleteUser(Long userId) throws UserNotFoundException {
        if (!userRepository.existsById(userId)) {
            throw new UserNotFoundException(userId);
        }
        userRepository.delete(userRepository.findById(userId).get());
    }

    //Operations with Followers
    @Override
    public void followUser(Long fromId, Long toId) throws UserNotFoundException {
        if (!userRepository.existsById(toId)) {
            throw new UserNotFoundException(toId);
        }
        User userFrom = userRepository.findById(fromId).get();
        User userTo = userRepository.findById(toId).get();
        UserFollower newRelation = new UserFollower(userFrom, userTo);
        followersRepository.save(newRelation);
    }

    @Override
    public void unfollowUser(Long fromId, Long toId) throws UserNotFoundException {
        if (!userRepository.existsById(toId)) {
            throw new UserNotFoundException(toId);
        }
        UserFollowerId relationId = new UserFollowerId(fromId, toId);
        Optional<UserFollower> relation = followersRepository.findById(relationId);
        if (relation.isEmpty()) {
            throw new RuntimeException("This relation follower: %s, following: %s does not exists".formatted(fromId, toId));
        }
        LocalDateTime followedAt = relation.get().getFollowedAt();

        if (LocalDateTime.now().isBefore(followedAt.plusMinutes(5L))) {
            return;
        };
        followersRepository.deleteById(relationId);
    }
    @Override
    public Integer findFollowersCount(Long userId) {
        return  followersRepository.findByUserId(userId).size();
    }

    @Override
    public List<UserDTO> findFollowersOf(Long userId) {
        List<UserFollower> userFollowerList = followersRepository.findByUserId(userId);
        List<User> followersList = userFollowerList.stream().map(UserFollower::getFollower).toList();
        return followersList.stream().map(this::createDTO).toList();
    }

    @Override
    public Integer findFollowingCount(Long userId) {
        return  followersRepository.findByFollowerId(userId).size();
    }
    @Override
    public List<UserDTO> findFollowingOf(Long userId) {
        List<UserFollower> userFollowerList = followersRepository.findByFollowerId(userId);
        List<User> followingList = userFollowerList.stream().map(UserFollower::getUser).toList();
        return followingList.stream().map(this::createDTO).toList();
    }




}
