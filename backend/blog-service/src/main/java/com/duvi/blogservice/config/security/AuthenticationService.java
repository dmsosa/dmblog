package com.duvi.blogservice.config.security;

import com.duvi.blogservice.model.User;
import com.duvi.blogservice.repository.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthenticationService implements UserDetailsService {

    private UserRepository userRepository;
    public AuthenticationService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<User> optUser = userRepository.findByUsername(username);
        if (optUser.isEmpty()) {
            throw new UsernameNotFoundException("User with username: %s was not found during authentication".formatted(username));
        }
        return optUser.get();
    }
}
