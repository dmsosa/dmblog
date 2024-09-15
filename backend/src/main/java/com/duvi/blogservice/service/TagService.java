package com.duvi.blogservice.service;

import com.duvi.blogservice.model.Tag;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface TagService {
    List<Tag> getAllTags();
}
