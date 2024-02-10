package com.duvi.blogservice.model;

import com.duvi.blogservice.model.dto.RegisterDTO;
import com.duvi.blogservice.model.relations.ArticleUser;
import com.duvi.blogservice.model.relations.UserFollower;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Set;

@Entity
@Getter
@Setter
@Table(name = "users")
@NoArgsConstructor
@AllArgsConstructor
public class User implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String username;
    @NotNull(message = "{email required}")
    @Pattern(regexp = "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$",
            message = "{invalid.email}")
    private String email;
    private String password;
    private String bio;
    private String image;
    @Enumerated(EnumType.STRING)
    private UserRole role;

    //Relations

        //FavArticles
    @OneToMany(
            fetch = FetchType.LAZY,
            cascade = {
                    CascadeType.PERSIST,
                    CascadeType.MERGE,
                    CascadeType.DETACH,
                    CascadeType.REFRESH },
            mappedBy = "article"
    )
    @JsonIgnore
    private Set<ArticleUser> favArticles;

        //Followers
    @OneToMany(
            fetch = FetchType.LAZY,
            cascade = {
                    CascadeType.PERSIST,
                    CascadeType.MERGE,
                    CascadeType.DETACH,
                    CascadeType.REFRESH
            },
            mappedBy = "follower"
    )
    @JsonIgnore
    private Set<UserFollower> followers;

        //Comments
    @OneToMany(mappedBy = "user")
    private Set<Comment> comments;


    //User methods

    public User(RegisterDTO userDTO) {
        this.username = userDTO.username();
        this.email = userDTO.email();
        this.password = userDTO.password();
        this.role = userDTO.role();
    }

    public void updateUser(String username, String email, String image, String bio) {
        this.username = username;
        this.email = email;
        this.image = image;
        this.bio = bio;

    }
    public void updatePassword(String password) {
        this.password = password;
    };
    public void updateRole(UserRole role) {
        this.role = role;
    };


    //UserDetails methods
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        List<SimpleGrantedAuthority> authoritiesList = new ArrayList<SimpleGrantedAuthority>();
        if (this.role.equals(UserRole.ADMIN)) {
            authoritiesList.add(new SimpleGrantedAuthority("admin"));
            authoritiesList.add(new SimpleGrantedAuthority("user"));
        } else if (this.role.equals(UserRole.USER)) {
            authoritiesList.add(new SimpleGrantedAuthority("user"));
        }
        return authoritiesList;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }

    public String getEmail() {return this.email;};

    public UserRole getRole() { return this.role;};

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
