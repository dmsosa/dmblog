package com.duvi.blogservice.service;

import com.duvi.blogservice.model.exceptions.ImageException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public interface AmazonS3Service {
    public String uploadUserImage(MultipartFile multipartFile, String folder, String username);
    public String uploadArticleImage(MultipartFile multipartFile, String articleSlug);
    public boolean existsByFilename(String fileName);
    public void deleteUserImage(String folder, String url);
    public void deleteArticleImage(String url);
    public String findIconUrl(String icon);
}
