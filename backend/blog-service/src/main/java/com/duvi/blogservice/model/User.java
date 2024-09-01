package com.duvi.blogservice.model;

import com.duvi.blogservice.model.dto.RegisterDTO;
import com.duvi.blogservice.model.relations.ArticleUser;
import com.duvi.blogservice.model.relations.UserFollower;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDateTime;
import java.util.*;

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
    @Length(min = 3, max = 25)
    private String username;
    @NotNull(message = "{email required}")
    @Pattern(regexp = "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$",
            message = "{invalid.email}")
    private String email;
    private String password;
    @Length(min = 10, max = 5000)
    private String bio;
    private String imageUrl;
    private String backgroundImageUrl;
    private String backgroundColor;
    @Enumerated(EnumType.STRING)
    private UserRole role;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    //Relations

        //FavArticles
    @OneToMany(
            fetch = FetchType.LAZY,
            cascade = {
                    CascadeType.PERSIST,
                    CascadeType.MERGE,
                    CascadeType.DETACH,
                    CascadeType.REFRESH },
            mappedBy = "user"
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
    @JsonIgnore
    private Set<Comment> comments;




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
