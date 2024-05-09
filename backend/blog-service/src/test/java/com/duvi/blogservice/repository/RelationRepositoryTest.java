package com.duvi.blogservice.repository;

import com.duvi.blogservice.model.relations.ArticleTag;
import com.duvi.blogservice.model.relations.ArticleUser;
import com.duvi.blogservice.model.relations.ArticleUserId;
import com.duvi.blogservice.model.relations.UserFollower;
import com.duvi.blogservice.repository.relations.ArticleTagRepository;
import com.duvi.blogservice.repository.relations.ArticleUserRepository;
import com.duvi.blogservice.repository.relations.UserFollowerRepository;
import org.junit.jupiter.api.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
public class RelationRepositoryTest {
    private final Logger logger = LoggerFactory.getLogger(this.getClass());
    @Autowired
    ArticleUserRepository favsRepository;
    @Autowired
    ArticleTagRepository catsRepository;
    @Autowired
    UserFollowerRepository followerRepository;

    @Test
    public void dbPopulated() {
        List<ArticleUser> favs = favsRepository.findAll();
        List<ArticleTag> cats = catsRepository.findAll();
        List<UserFollower> followers = followerRepository.findAll();
        for (ArticleUser rel : favs) {
            ArticleUserId id = rel.getId();
            logger.info("Relation found: user Id: " + id.getUserId() + " - article Id: " + id.getArticleId());
        }
        Boolean condition = favs.isEmpty() && cats.isEmpty() && followers.isEmpty();
        assertFalse(condition);
    }

    @Test
    public void whenRelationThenGetEntities() {
        ArticleUserId id = new ArticleUserId(1L, 2L);
        Optional<ArticleUser> relation = favsRepository.findById(id);
        assertFalse(relation.isEmpty());
    }
}
