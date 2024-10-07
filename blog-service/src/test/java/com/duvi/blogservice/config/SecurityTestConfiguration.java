package com.duvi.blogservice.config;

import com.duvi.blogservice.config.security.SecurityConfig;
import com.duvi.blogservice.model.User;
import com.duvi.blogservice.model.UserRole;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Import;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.provisioning.UserDetailsManager;


@TestConfiguration
@Import({ SecurityConfig.class })
public class SecurityTestConfiguration {

    private static class testUserDetailsManager implements UserDetailsManager{
        private InMemoryUserDetailsManager inMemoryUserDetailsManager;
        public testUserDetailsManager() {
            this.inMemoryUserDetailsManager = new InMemoryUserDetailsManager();
        }

        @Override
        public void createUser(UserDetails user) {
            this.inMemoryUserDetailsManager.createUser(user);
        }

        @Override
        public void updateUser(UserDetails user) {
            this.inMemoryUserDetailsManager.updateUser(user);

        }

        @Override
        public void deleteUser(String username) {
            this.inMemoryUserDetailsManager.deleteUser(username);

        }

        @Override
        public void changePassword(String oldPassword, String newPassword) {
            this.inMemoryUserDetailsManager.changePassword(oldPassword,  newPassword);

        }

        @Override
        public boolean userExists(String username) {
            return this.inMemoryUserDetailsManager.userExists(username);
        }

        @Override
        public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
            User user = new User();
            user.setUsername(username);
            user.setEmail(username + "@test.com");
            user.setRole(UserRole.USER);
            return user;
        }
    }

    @Bean
    public UserDetailsService testUserDetailsService() {
        return new testUserDetailsManager();
    }

}
