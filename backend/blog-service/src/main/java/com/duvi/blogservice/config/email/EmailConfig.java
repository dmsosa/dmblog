package com.duvi.blogservice.config.email;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;

import java.util.Properties;

@Configuration
public class EmailConfig {

    //SMTP Username and Password
    @Value("${mail.username}")
    private String gmailUsername;
    @Value("${mail.password}")
    private String gmailPassword;


    //SMTP Config
    @Bean
    JavaMailSender getJavaMailSender() {
        JavaMailSenderImpl javaMailSender = new JavaMailSenderImpl();
        Properties properties = new Properties();
        properties.put("mail.smtp.auth", "true");
        properties.put("mail.smtp.starttls.enable","true");

        javaMailSender.setHost("smtp.gmail.com");
        javaMailSender.setPort(587);
        javaMailSender.setUsername(gmailUsername);
        javaMailSender.setPassword(gmailPassword);
        javaMailSender.setJavaMailProperties(properties);

        return javaMailSender;
    }
}
