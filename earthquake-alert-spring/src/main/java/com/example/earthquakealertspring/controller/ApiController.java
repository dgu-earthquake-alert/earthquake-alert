package com.example.earthquakealertspring.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@RestController
public class ApiController {
/*서울시 OpenAPI가 제공하는 공공데이터를 가져오는 API를 호출하는 컨트롤러입니다. 
https를 사용하는 브라우저는 http 호출을 지원하지 않기 때문에 필요합니다.*/

    private final WebClient webClient;

    public ApiController(WebClient webClient) {
        this.webClient = webClient;
    }


    @RequestMapping("/api/{apiKey}/json/{pathVar1}/{pathVar2}/{pathVar3}/{pathVar4}")
    public Mono<ResponseEntity<Map<String, Object>>> fetchApiData(@PathVariable String apiKey, @PathVariable String pathVar1, @PathVariable String pathVar2, @PathVariable String pathVar3, @PathVariable String pathVar4) {
        String url = "http://openapi.seoul.go.kr:8088/" + apiKey + "/json/" + pathVar1 + "/" + pathVar2 + "/" + pathVar3 + "/" + pathVar4;
        return this.webClient.get()
                .uri(url)
                .retrieve()
                .toEntity(Map.class);
    }
    
}