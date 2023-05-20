package com.example.earthquakealertspring.controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TokenController {

    @PostMapping("/register-token")
    public void registerToken(@RequestBody TokenRequest request) {
        String token = request.getToken();
        // token을 처리하는 로직
    }

    static class TokenRequest {
        private String token;

        public String getToken() {
            return token;
        }

        public void setToken(String token) {
            this.token = token;
        }
    }
}