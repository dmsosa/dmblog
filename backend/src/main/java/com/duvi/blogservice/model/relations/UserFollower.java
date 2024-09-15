package com.duvi.blogservice.model.relations;

import com.duvi.blogservice.model.User;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
@Entity
@Table(name = "followers")
public class UserFollower {

    @EmbeddedId
    private UserFollowerId id;

    @ManyToOne
    @MapsId("userId")
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @MapsId("followerId")
    @JoinColumn(name = "follower_id")
    private User follower;

    private LocalDateTime followedAt;

    public UserFollower(User user, User follower) {
        this.id = new UserFollowerId(user.getId(), follower.getId());
        this.user = user;
        this.follower = follower;
        this.followedAt = LocalDateTime.now();
    }
}
