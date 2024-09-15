package com.duvi.blogservice.service.impl;

import com.duvi.blogservice.model.exceptions.ImageException;
import com.duvi.blogservice.service.AmazonS3Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.DeleteObjectRequest;
import software.amazon.awssdk.services.s3.model.GetUrlRequest;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

import java.util.HashMap;
import java.util.Map;

@Service
public class AmazonS3ServiceImpl implements AmazonS3Service {

    private Logger logger = LoggerFactory.getLogger(this.getClass());
    private static final String BUCKET_NAME = "dmblogbucket";
    @Autowired
    private S3Client s3Client;

    @Override
    public String uploadUserImage(MultipartFile multipartFile, String folder, String username) {

        try {
            String fileName = folder + "/" + username;
            byte[] bytes = multipartFile.getBytes();

            Map<String, String> metadata = new HashMap<>();
            metadata.put("Powered By", "duvi");

            PutObjectRequest putObjectReq = PutObjectRequest.builder()
                    .bucket(BUCKET_NAME)
                    .metadata(metadata)
                    .key(fileName)
                    .build();

            s3Client.putObject(putObjectReq, RequestBody.fromBytes(bytes));

            GetUrlRequest getUrlRequest = GetUrlRequest.builder().bucket(BUCKET_NAME).key(fileName).build();
            return s3Client.utilities().getUrl(getUrlRequest).toString();
        } catch (Exception exception) {
            logger.error("Fehler bei der Hochladen den Bilder: " + exception.getMessage());
            return "";
        }
    }

    @Override
    public String uploadArticleImage(MultipartFile multipartFile, String articleSlug) {
        return null;
    }

    @Override
    public boolean existsByFilename(String fileName) {
        return false;
    }

    @Override
    public void deleteUserImage(String folder, String username) {
        String key = folder + "/" + username;
        DeleteObjectRequest deleteObjectReq = DeleteObjectRequest
                .builder()
                .bucket(BUCKET_NAME)
                .key(key)
                .build();
        s3Client.deleteObject(deleteObjectReq);
    }
    @Override
    public void deleteArticleImage(String articleSlug) {
        String key = "articles/" + articleSlug;
        DeleteObjectRequest deleteObjectReq = DeleteObjectRequest
                .builder()
                .bucket(BUCKET_NAME)
                .key(key)
                .build();
        s3Client.deleteObject(deleteObjectReq);
    }

    @Override
    public String findIconUrl(String icon) {
        String objectKey = "profile/" + icon + ".svg";
        GetUrlRequest getUrlRequest = GetUrlRequest.builder()
                .bucket(BUCKET_NAME)
                .key(objectKey)
                .build();
        return s3Client.utilities().getUrl(getUrlRequest).toString();
    }
}
