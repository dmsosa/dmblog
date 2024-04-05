package com.duvi.blogservice.config.security;

import org.springframework.security.oauth2.client.registration.ClientRegistrationRepository;
import org.springframework.security.oauth2.client.web.OAuth2AuthorizationRequestRedirectFilter;

public class CustomRedirectFilter extends OAuth2AuthorizationRequestRedirectFilter {
    public CustomRedirectFilter(ClientRegistrationRepository clientRegistrationRepository) {
        super(clientRegistrationRepository);
    }
//    public
}
