package com.duvi.blogservice.service.impl;

import com.duvi.blogservice.service.AmazonS3Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import software.amazon.awssdk.services.s3.S3Client;

@Service
public class AmazonS3ServiceImpl implements AmazonS3Service {


    @Autowired
    S3Client s3Client;

    @Override
    public void uploadImage() {

    }
}
