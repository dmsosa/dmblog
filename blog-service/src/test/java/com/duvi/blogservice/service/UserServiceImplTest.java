package com.duvi.blogservice.service;

import com.duvi.blogservice.model.User;
import com.duvi.blogservice.model.UserRole;
import com.duvi.blogservice.model.dto.RegisterDTO;
import com.duvi.blogservice.model.dto.UserResponseDTO;
import com.duvi.blogservice.model.exceptions.EntityAlreadyExistsException;
import com.duvi.blogservice.model.exceptions.EntityDoesNotExistsException;
import com.duvi.blogservice.model.relations.UserFollower;
import com.duvi.blogservice.model.relations.UserFollowerId;
import com.duvi.blogservice.repository.UserRepository;
import com.duvi.blogservice.repository.relations.UserFollowerRepository;
import com.duvi.blogservice.service.impl.AmazonS3ServiceImpl;
import com.duvi.blogservice.service.impl.UserServiceImpl;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import software.amazon.awssdk.services.s3.S3Client;

import java.util.List;
import java.util.Objects;

import static org.junit.jupiter.api.Assertions.*;


@DataJpaTest
public class UserServiceImplTest {


    @TestConfiguration
    public static class UserServiceImplTestConfiguration {

        @Autowired
        public UserRepository userRepository;
        @Autowired
        public UserFollowerRepository followersRepository;

        @Bean
        public S3Client s3Client() {
            return S3Client.create();
        }

        @Bean
        public StorageService storageService() {
            return new AmazonS3ServiceImpl();
        };

        @Bean
        public UserService userService() {
            return new UserServiceImpl(userRepository, followersRepository, storageService());
        }
    }
    @Autowired
    private UserServiceImpl userService;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserFollowerRepository followersRepository;



    @Test
    public void setUp() {

        assertTrue(Objects.nonNull(userService));
    }
    @Test
    public void whenUsernameExistsThenException() {
        assertThrows(EntityAlreadyExistsException.class, () -> {
            RegisterDTO registerDTO = new RegisterDTO("test1", "test1@test.com", "123password",   UserRole.USER);
            userService.createUser(registerDTO);
        });
    }
    @Test
    public void whenRegisterCorrectlyThenUserCreated() throws EntityAlreadyExistsException {
        RegisterDTO registerDTO = new RegisterDTO("duvi", "duvi@test.com", "123password",   UserRole.USER);
        userService.createUser(registerDTO);
        assertTrue(userRepository.findByUsername("duvi").isPresent());
    }

    @Test
    public void whenFollowThenRelationIsCreated() throws EntityDoesNotExistsException {
        //UserId1 is NOT followed by UserId5 yet
        UserFollowerId relId = new UserFollowerId(1L, 5L);
        Boolean followingBefore = followersRepository.findById(relId).isPresent();
        userService.followUser("test1", "test5");
        Boolean followingAfter = followersRepository.findById(relId).isPresent();

        assertTrue(!followingBefore && followingAfter);
    }
    @Test
    public void whenUnfollowThenRelationIsDeleted() throws EntityDoesNotExistsException {

        //UserId2 is followed by UserId1
        UserFollowerId relId = new UserFollowerId(2L, 1L);

        Boolean followingBefore = followersRepository.findById(relId).isPresent();
        userService.unfollowUser("test2", "test1");
        Boolean followingAfter = followersRepository.findById(relId).isPresent();

        assertTrue(followingBefore && !followingAfter);

    }
    @Test
    public void whenFollowSuccess_ThenDto() throws EntityDoesNotExistsException {
        //Assume the current logged user is @test1
        UserResponseDTO user5 = userService.followUser("test5", "test1");
        assertTrue(Objects.equals(user5.username(), "test5") && user5.isFollowing());
    }
    @Test
    public void whenUnfollowSuccess_ThenDto() throws EntityDoesNotExistsException {
        //Assume the current logged user is @test1
        UserResponseDTO user2 = userService.unfollowUser("test2", "test1");
        assertTrue(Objects.equals(user2.username(), "test2") && !user2.isFollowing());
    }
    @Test
    public void whenFollowDoesNotExist_ThenException() throws EntityDoesNotExistsException {
        //Assume the current logged user is @test1
        assertThrows(EntityDoesNotExistsException.class, () -> userService.followUser("donotexists", "test1"));
    }
}
