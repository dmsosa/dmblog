package com.duvi.blogservice.config.security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.exceptions.TokenExpiredException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.duvi.blogservice.model.User;
import org.antlr.v4.runtime.Token;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.Date;

@Service
public class TokenService {

    @Value("${api.security.token.secret}")
    private String secret;

    @Value("${api.security.token.issuer}")
    private String issuer;

    public String generateToken(User user) throws RuntimeException {
        Algorithm algorithm = Algorithm.HMAC256(secret);
        try {
            return JWT.create()
                    .withIssuedAt(Instant.now())
                    .withExpiresAt(generateExpirationDate())
                    .withSubject(user.getUsername())
                    .withIssuer(issuer)
                    .sign(algorithm);
        } catch (JWTCreationException e) {
            throw new RuntimeException("An exception ocurred while creating the JWT", e);
        }

    }

    public String validateToken(String token) {
        Algorithm algorithm = Algorithm.HMAC256(secret);

        try {
            JWTVerifier verifier = JWT.require(algorithm)
                    .withIssuer(issuer)
                    .build();
            DecodedJWT decodedJWT = verifier.verify(token);
            return decodedJWT.getSubject();
        }
        catch (JWTVerificationException e) {
            throw(e);
        }

    }

    public Date getExpirationDate(String token) {
        Algorithm algorithm = Algorithm.HMAC256(secret);
        try {
            JWTVerifier verifier = JWT.require(algorithm)
                    .withIssuer(issuer)
                    .build();
            DecodedJWT decodedJWT = verifier.verify(token);
            return decodedJWT.getExpiresAt();
        }
        catch (JWTVerificationException e) {
            throw(e);
        }
    }
    private Instant generateExpirationDate() {
        return LocalDateTime.now().plusHours(10).toInstant(ZoneOffset.of("+00:00"));
    }



}
