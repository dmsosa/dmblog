package com.duvi.blogservice.config.flyway;



import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.flyway.FlywayConfigurationCustomizer;
import org.springframework.boot.autoconfigure.flyway.FlywayMigrationStrategy;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;


@Configuration
public class FlywayConfig {
    @Value("${datasource}")
    private String datasource;


    @Bean
    FlywayConfigurationCustomizer customizer() {
        return configuration -> configuration
                .locations("classpath:/db/migration/%s".formatted(datasource))
                .baselineOnMigrate(true);
    }

    @Profile("dev")
    @Bean
    FlywayConfigurationCustomizer devCustomizer() {
        return configuration -> configuration
                .locations("classpath:dev/db/migration/%s".formatted(datasource))
                .baselineOnMigrate(true);
    }



}
