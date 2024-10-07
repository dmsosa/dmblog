package com.duvi.blogservice.config;

import com.duvi.blogservice.config.security.TokenService;
import com.duvi.blogservice.model.User;
import com.duvi.blogservice.model.UserRole;
import com.duvi.blogservice.repository.UserRepository;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Import;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;

import java.time.Clock;
import java.util.List;

@TestConfiguration
@Import({ SecurityTestConfiguration.class })
public class ControllerTestConfiguration {

    @Bean
    public TokenService tokenService() {
        return new TokenService();
    }

    @Bean
    public Clock clock() {
        return Clock.systemDefaultZone();
    }

}
