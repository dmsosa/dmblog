package com.duvi.blogservice.config.aws;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import software.amazon.awssdk.services.s3.S3Client;

@Configuration
public class AwsConfig {
    @Bean
    public S3Client s3Client() {
        S3Client s3Client = S3Client.create();
        return s3Client;
    }
}
