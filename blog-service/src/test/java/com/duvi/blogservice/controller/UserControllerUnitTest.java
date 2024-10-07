package com.duvi.blogservice.controller;

import com.duvi.blogservice.config.ControllerTestConfiguration;
import com.duvi.blogservice.config.security.TokenService;
import com.duvi.blogservice.model.dto.LoginDTO;
import com.duvi.blogservice.model.dto.UserResponseDTO;
import com.duvi.blogservice.service.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

import org.springframework.test.web.servlet.MockMvc;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;


import java.time.Clock;
import java.time.Instant;
import java.time.temporal.ChronoUnit;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;

@WebMvcTest(controllers = { UsersController.class })
@Import({ ControllerTestConfiguration.class })
public class UserControllerUnitTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private TokenService tokenService;

    @MockBean
    private UserService userService;

    @MockBean
    private AuthenticationManager authenticationManager;


    @BeforeEach
    public void setUpMocks() {
        Mockito.when(tokenService.generateToken(Mockito.anyString(), Mockito.anyString())).thenReturn("testJwtToken");
    }

    @Test
    public void whenLoginDoesNotExist_ThenStatus404() throws Exception {
        Mockito.when(userService.existsByLogin(Mockito.anyString())).thenReturn(false);
        LoginDTO loginDTO = new LoginDTO("exceptionUser", "exception123");
        ObjectMapper objectMapper = new ObjectMapper();
        mockMvc.perform(
                        post("/api/users/login")
                                .accept(MediaType.APPLICATION_JSON_VALUE)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(loginDTO)))
                .andExpect(status().isNotFound())
                .andDo(print());
    }
    @Test
    public void whenLoginExist_ThenStatus200() throws Exception {
        Mockito.when(userService.existsByLogin(Mockito.anyString())).thenReturn(true);
        LoginDTO loginDTO = new LoginDTO("loginUserTest", "loginUserTest123");
        UserResponseDTO loggedUserMock = new UserResponseDTO(1L, "loginUserTest", "loginUserTest@email.com", "loginUserTest123", "I'm testing the login!", "", "", "", 0, 0, null, null, false);
        Mockito.when(userService.findUserByLogin(Mockito.anyString())).thenReturn(loggedUserMock);
        Mockito.when(authenticationManager.authenticate(Mockito.any(UsernamePasswordAuthenticationToken.class))).thenAnswer( ans -> {
            return ans.getArgument(0);
        });


        ObjectMapper objectMapper = new ObjectMapper();
        mockMvc.perform(
                        post("/api/users/login")
                                .accept(MediaType.APPLICATION_JSON_VALUE)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(loginDTO)))
                .andExpect(status().isOk())
                .andDo(print());
    }
}
