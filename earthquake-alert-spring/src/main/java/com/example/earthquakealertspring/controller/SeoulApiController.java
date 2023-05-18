package com.example.earthquakealertspring.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@RestController
public class SeoulApiController {
    private final RestTemplate restTemplate;

    public SeoulApiController() {
        this.restTemplate = new RestTemplate();
    }
    @RequestMapping("/api/{apiKey}/json/{pathVar1}/{pathVar2}/{pathVar3}")
    public ResponseEntity<Map> fetchApiData(@PathVariable String apiKey, @PathVariable String pathVar1, @PathVariable String pathVar2, @PathVariable String pathVar3) {
        String url = "http://openapi.seoul.go.kr:8088/" + apiKey + "/json/" + pathVar1 + "/" + pathVar2 + "/" + pathVar3;
        return restTemplate.getForEntity(url, Map.class);
    }
}
