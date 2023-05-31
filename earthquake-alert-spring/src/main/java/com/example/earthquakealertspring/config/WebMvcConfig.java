package com.example.earthquakealertspring.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebMvcConfig implements WebMvcConfigurer {

    private final long MAX_AGE_SECS = 3600;

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
//                배포시 로컬호스트 삭제, localhost:3000 : 로컬(docker x), localhost:3001 : 로컬(docker o)
                .allowedOrigins("https://www.earthquake-alert.site", "https://earthquake-alert.site")
                //.allowedOrigins("http://localhost:3000", "http://localhost:3001", "https://www.earthquake-alert.site", "https://earthquake-alert.site")
                .allowedMethods("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true)
                .maxAge(MAX_AGE_SECS);
    }
}