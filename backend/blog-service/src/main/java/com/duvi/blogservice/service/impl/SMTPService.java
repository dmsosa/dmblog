package com.duvi.blogservice.service.impl;

import com.duvi.blogservice.service.EmailService;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Arrays;

@Service
public class SMTPService implements EmailService {

    @Value("${mail.username}")
    private String fromUsername;

    private JavaMailSender javaMailSender;

    public SMTPService(JavaMailSender javaMailSender) {
        this.javaMailSender = javaMailSender;
    }

    @Override
    public void sendGreetingEmail(String to) throws MessagingException {
        String toName = getToName(to);
        String text = getGreetingBody(toName);
        MimeMessage message = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);
        helper.setFrom(fromUsername);
        helper.setTo(to);
        helper.setSubject("Greetings from Duvi at - " + LocalDateTime.now()    .toString() + " !");
        helper.setText(text, true);
        javaMailSender.send(message);
    }

    @Override
    public String getToName(String to) {
        return Arrays.stream(to.strip().split("@")).toList().get(0);
    }
}
