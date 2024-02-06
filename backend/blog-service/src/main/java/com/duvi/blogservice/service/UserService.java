package com.duvi.blogservice.service;

import com.duvi.blogservice.model.User;
import org.springframework.stereotype.Service;

@Service
public interface UserService {
    User findUserByUsername();
}
