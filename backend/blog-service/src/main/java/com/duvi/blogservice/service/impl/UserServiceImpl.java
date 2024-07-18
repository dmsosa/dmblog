package com.duvi.blogservice.service.impl;

import com.duvi.blogservice.model.User;
import com.duvi.blogservice.model.UserRole;
import com.duvi.blogservice.model.dto.RegisterDTO;
import com.duvi.blogservice.model.dto.SetUserDTO;
import com.duvi.blogservice.model.dto.UserResponseDTO;
import com.duvi.blogservice.model.exceptions.EntityAlreadyExistsException;
import com.duvi.blogservice.model.exceptions.EntityDoesNotExistsException;
import com.duvi.blogservice.model.relations.UserFollower;
import com.duvi.blogservice.repository.UserRepository;
import com.duvi.blogservice.repository.relations.UserFollowerRepository;
import com.duvi.blogservice.service.AmazonS3Service;
import com.duvi.blogservice.service.UserService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    private UserRepository userRepository;
    private UserFollowerRepository followersRepository;
    private AmazonS3Service s3Service;

    public UserServiceImpl(
            UserRepository userRepository,
            UserFollowerRepository followersRepository,
            AmazonS3Service s3Service) {
        this.userRepository = userRepository;
        this.followersRepository = followersRepository;
        this.s3Service = s3Service;
    }

    //Check following
    public boolean isFollowing(Long userId, String loggedUsername) {
        List<UserFollower> relations = followersRepository.findByUserId(userId);
        return !relations.stream().filter( follower -> Objects.equals(follower.getFollower().getUsername(), loggedUsername))
                .toList().isEmpty();
    };

    //Create DTOS, by default isFollowing is set to false
    @Override
    public UserResponseDTO createDTO(User user) {
        Integer followingCount = this.findFollowingCount(user.getId());
        Integer followersCount = this.findFollowersCount(user.getId());
        return new UserResponseDTO(user.getId(), user.getUsername(),
                user.getEmail(), user.getPassword(),
                user.getBio(), user.getImageUrl(),
                user.getBackgroundImageUrl(),
                user.getIcon(), user.getBackgroundColor(),
                followersCount, followingCount,
                user.getCreatedAt(), user.getUpdatedAt(), false);
    }

    //Basic CRUD
        //GET
    @Override
    public List<UserResponseDTO> getAllUsers() {
        List<User> userList = userRepository.findAll();
        List<UserResponseDTO> userResponseDTOS = userList.stream().map(this::createDTO).toList();
        return userResponseDTOS;
    }
    @Override
    public UserResponseDTO findUserById(Long userId) throws EntityDoesNotExistsException {
        if (!userRepository.existsById(userId)) {
            throw new EntityDoesNotExistsException(userId);
        }
        User user = userRepository.findById(userId).get();
        return createDTO(user);
    }

    @Override
    public UserResponseDTO findUserByUsername(String username) throws EntityDoesNotExistsException {
        Optional<User> optUser = userRepository.findByUsername(username);
        if (optUser.isEmpty()) {
            throw new EntityDoesNotExistsException("User with username '%s' do not exists!".formatted(username));
        }
        return createDTO(optUser.get());
    }

    @Override
    public UserResponseDTO findUserByEmail(String email) throws EntityDoesNotExistsException {
        Optional<User> optUser = userRepository.findByEmail(email);
        if (optUser.isEmpty()) {
            throw new EntityDoesNotExistsException("User with email '%s' do not exists!".formatted(email));
        }
        return createDTO(optUser.get());
    }

    @Override
    public UserResponseDTO findUserByLogin(String login) throws EntityDoesNotExistsException {

        if (!(userRepository.existsByUsername(login) || userRepository.existsByEmail(login))) {
            throw new EntityDoesNotExistsException("User with login '%s' do not exists!".formatted(login));
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
    public UserResponseDTO createUser(RegisterDTO register) throws EntityAlreadyExistsException {
        if (userRepository.existsByUsername(register.username())) {
            throw new EntityAlreadyExistsException("User with username %s already exists!".formatted(register.username()));
        }
        if (userRepository.existsByEmail(register.email())) {
            throw new EntityAlreadyExistsException("User with email %s already exists!".formatted(register.email()));
        }

        String encryptedPassword = new BCryptPasswordEncoder().encode(register.password());

        User createdUser = new User();
        createdUser.setUsername(register.username());
        createdUser.setEmail(register.email());
        createdUser.setPassword(encryptedPassword);
        createdUser.setBio("Ich bin ein neuer Benutzer der Dmblog!");
        createdUser.setImageUrl("");
        createdUser.setBackgroundImageUrl("");
        createdUser.setIcon("apple");
        createdUser.setBackgroundColor("#DFFF00");
        createdUser.setRole(UserRole.USER);

        return createDTO(userRepository.save(createdUser));
    }
        //PUT
    @Override
    public UserResponseDTO updateUser(String oldUsername, SetUserDTO userDTO) throws EntityAlreadyExistsException {

        if (userRepository.existsByUsername(userDTO.username())) {
            throw new EntityAlreadyExistsException("User with username %s already exists!".formatted(userDTO.username()));
        }
        if (userRepository.existsByEmail(userDTO.email())) {
            throw new EntityAlreadyExistsException("User with email %s already exists!".formatted(userDTO.email()));
        }

        String imageUrl = "";
        String backgroundImageUrl = "";

        if (userDTO.image() != null) {

            imageUrl = s3Service.uploadImage(userDTO.image());
        }
        if (userDTO.backgroundImage() != null) {
            backgroundImageUrl = s3Service.uploadImage(userDTO.backgroundImage());
        }

        User oldUser = userRepository.findByUsername(oldUsername).get();

        if (!oldUser.getImageUrl().isEmpty()) {
            s3Service.deleteByUrl(oldUser.getImageUrl());
        }
        if (!oldUser.getBackgroundImageUrl().isEmpty()) {
            s3Service.deleteByUrl(oldUser.getBackgroundImageUrl());
        }

        oldUser.setUsername(userDTO.username());
        oldUser.setEmail(userDTO.email());
        oldUser.setImageUrl(imageUrl);
        oldUser.setBackgroundImageUrl(backgroundImageUrl);
        oldUser.setIcon(userDTO.icon());
        oldUser.setBackgroundColor(userDTO.backgroundColor());
        oldUser.setBio(userDTO.bio());

        return createDTO(userRepository.save(oldUser));
    }
        //DELETE
    @Override
    public void deleteUser(Long userId) throws EntityDoesNotExistsException {
        if (!userRepository.existsById(userId)) {
            throw new EntityDoesNotExistsException(userId);
        }
        userRepository.delete(userRepository.findById(userId).get());
    }

    //Operations with Followers
    @Override
    public UserResponseDTO followUser(String fromUsername, String toUsername) throws EntityDoesNotExistsException {
        if (!userRepository.existsByUsername(toUsername)) {
            throw new EntityDoesNotExistsException("User with username %s do not exists!".formatted(toUsername));
        }
        User userFrom = userRepository.findByUsername(fromUsername).get();
        User userTo = userRepository.findByUsername(toUsername).get();
        UserFollower newRelation = new UserFollower(userTo, userFrom);
        followersRepository.save(newRelation);
        return createDTO(userRepository.findByUsername(toUsername).get()).withFollowing(isFollowing(userTo.getId(), fromUsername));
    }

    @Override
    public UserResponseDTO unfollowUser(String fromUsername, String toUsername) throws EntityDoesNotExistsException {
        if (!userRepository.existsByUsername(toUsername)) {
            throw new EntityDoesNotExistsException("User with username %s do not exists!".formatted(toUsername));
        }
        User userTo = userRepository.findByUsername(toUsername).get();
        List<UserFollower> relations = followersRepository.findByUserId(userTo.getId());
        List<UserFollower> relation = relations.stream().filter(rel ->
                Objects.equals(rel.getFollower().getUsername(), fromUsername)).toList();

        if (!relation.isEmpty()) {
            followersRepository.delete(relation.getFirst());
        }
        return createDTO(userRepository.findByUsername(toUsername).get()).withFollowing(isFollowing(userTo.getId(), fromUsername));
    }
    @Override
    public Integer findFollowersCount(Long userId) {
        return  followersRepository.findByUserId(userId).size();
    }

    @Override
    public List<UserResponseDTO> findFollowersOf(Long userId) {
        List<UserFollower> userFollowerList = followersRepository.findByUserId(userId);
        List<User> followersList = userFollowerList.stream().map(UserFollower::getFollower).toList();
        return followersList.stream().map(this::createDTO).toList();
    }

    @Override
    public Integer findFollowingCount(Long userId) {
        return  followersRepository.findByFollowerId(userId).size();
    }
    @Override
    public List<UserResponseDTO> findFollowingOf(Long userId) {
        List<UserFollower> userFollowerList = followersRepository.findByFollowerId(userId);
        List<User> followingList = userFollowerList.stream().map(UserFollower::getUser).toList();
        return followingList.stream().map(this::createDTO).toList();
    }

}
