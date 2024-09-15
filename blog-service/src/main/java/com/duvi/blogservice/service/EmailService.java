package com.duvi.blogservice.service;

import jakarta.mail.MessagingException;
import org.springframework.stereotype.Service;

@Service
public interface EmailService {
    public void sendGreetingEmail(String to) throws MessagingException;
    public String getToName(String to);
    default String getGreetingBody(String toName) {
        StringBuilder body = new StringBuilder("<!DOCTYPE html>\n" +
                "<html lang=\"en\">\n" +
                "\n" +
                "<body>\n" +
                "    <div>\n" +
                "        <h1 class=\"title\"> Hallo ");
        body.append(toName + "!</h1>\n" +
                "        <p>Ich freue mich uber das, dass du meine Seite besuchen hatest, danke sehr!</p>\n" +
                "        <p>Macht Sie weiter so, und also erinnert dich: Es gibt keine Unmoglichkeiten</p>\n" +
                "    </div>\n" +
                "    <br/>\n" +
                "    <br/>\n" +
                "    <h2>Erinnert dich uber dieses!</h2>\n" +
                "    <hr></hr>\n" +
                "    <p>Denn also hat Gott die Welt geliebt, dass er seinen eingeborenen Sohn gab, auf dass alle, die an ihn glauben, nicht verloren werden, sondern das ewige Leben haben.</p>\n" +
                "    <p>For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life.</p>\n" +
                "    <p>Porque de tal manera amó Dios al mundo, que ha dado a su Hijo unigénito, para que todo aquel que en él cree, no se pierda, mas tenga vida eterna.</p>\n" +
                "    <hr></hr>\n" +
                "</body>\n" +
                "</html>");

        return body.toString();
    };
}
