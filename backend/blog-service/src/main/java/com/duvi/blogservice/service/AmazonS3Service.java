package com.duvi.blogservice.service;

import com.duvi.blogservice.model.exceptions.ImageException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public interface AmazonS3Service {
    public String uploadImage(MultipartFile multipartFile);
    public boolean existsByFilename(String fileName);
    public void deleteByUrl(String url);
    public String findIconUrl(String icon);
}
