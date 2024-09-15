package com.duvi.blogservice.repository.relations;

import com.duvi.blogservice.model.relations.UserFollower;
import com.duvi.blogservice.model.relations.UserFollowerId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserFollowerRepository extends JpaRepository<UserFollower, UserFollowerId> {
    List<UserFollower> findByFollowerId(Long id);
    List<UserFollower> findByUserId(Long id);
}
