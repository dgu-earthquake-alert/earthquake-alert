package com.example.earthquakealertspring.config;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import java.util.ArrayList;
import java.util.List;
import java.util.Collections;
import org.springframework.http.MediaType;

@Configuration
public class RestTemplateConfig {

    @Bean
    public RestTemplate restTemplate(RestTemplateBuilder builder) {
        // HttpMessageConverter를 명시적으로 추가합니다.
        List<HttpMessageConverter<?>> messageConverters = new ArrayList<>();
        MappingJackson2HttpMessageConverter jsonConverter = new MappingJackson2HttpMessageConverter();
        // 모든 Content-Type을 무시하고 항상 application/json;charset=UTF-8로 해석합니다.
        jsonConverter.setSupportedMediaTypes(Collections.singletonList(MediaType.ALL));
        messageConverters.add(jsonConverter);
        return builder.additionalMessageConverters(messageConverters).build();
    }
}
