package com.duvi.blogservice.model.relations;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.*;

import java.io.Serializable;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
@Embeddable
public class UserFollowerId implements Serializable {
    @Column(name = "user_id")
    Long userId;

    @Column(name = "follower_id")
    Long followerId;
}
