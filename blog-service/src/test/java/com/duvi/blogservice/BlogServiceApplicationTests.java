package com.duvi.blogservice;

import org.junit.jupiter.api.Test;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;

@SpringBootTest
@EnableAutoConfiguration
@TestPropertySource(locations = "classpath:application.yaml")
class BlogServiceApplicationTests {

	@Test
	void contextLoads() {
	}

}
