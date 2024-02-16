package com.duvi.blogservice.service.impl;

import com.duvi.blogservice.model.Tag;
import com.duvi.blogservice.repository.TagRepository;
import com.duvi.blogservice.service.TagService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TagServiceImpl implements TagService {

    private TagRepository tagRepository;
    public TagServiceImpl(TagRepository tagRepository) {
        this.tagRepository = tagRepository;
    }
    @Override
    public List<Tag> getAllTags() {
        return tagRepository.findAll();
    }
}
