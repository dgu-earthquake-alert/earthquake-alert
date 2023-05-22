package com.example.earthquakealertspring.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                //보안상 안좋지만 로컬에서 CORS에러를 막기 위함..
                //.allowedOrigins("*")
                //배포 시 아래 코드로 변경
                .allowedOrigins("https://earthquake-alert.site","https://www.earthquake-alert.site", "http://localhost:3001")
                .allowedMethods("*")
                .allowCredentials(true);
    }
}