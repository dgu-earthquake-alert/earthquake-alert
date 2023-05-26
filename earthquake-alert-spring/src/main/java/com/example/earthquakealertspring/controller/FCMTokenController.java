package com.example.earthquakealertspring.controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.earthquakealertspring.service.FCMTokenService;

import org.springframework.beans.factory.annotation.Autowired;

@RestController
public class FCMTokenController {
    private final FCMTokenService fcmTokenService;

    @Autowired
    public FCMTokenController(FCMTokenService fcmTokenService) {
        this.fcmTokenService = fcmTokenService;
    }

    @PostMapping("/api/register-token")
    public void registerToken(@RequestBody FCMTokenRequest request) {
        String fcmToken = request.getFCMToken();
        // token을 처리하는 로직
        //fcmToken을 fcmrepository에 저장
        fcmTokenService.saveToken(fcmToken);

    }

    static class FCMTokenRequest {
        private String FCMToken;

        public String getFCMToken() {
            return FCMToken;
        }

        public void setFCMToken(String FCMToken) {
            this.FCMToken = FCMToken;
        }
    }
}