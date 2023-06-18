package com.example.earthquakealertspring.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.example.earthquakealertspring.entity.FCMTokenEntity;
import com.example.earthquakealertspring.repository.FCMTokenRepository;

import java.util.HashMap;
import java.util.Map;

@Service
public class FCMTokenService {

    private static final Logger logger = LoggerFactory.getLogger(FCMTokenService.class);

    private static final String FCM_API_URL = "https://fcm.googleapis.com/fcm/send";

    private final RestTemplate restTemplate;
    private final String fcmServerKey;
    private final FCMTokenRepository fcmTokenRepository;

    public FCMTokenService(RestTemplate restTemplate, @Value("${app.fcm.server-key}") String fcmServerKey, FCMTokenRepository fcmTokenRepository) {
        this.restTemplate = restTemplate;
        this.fcmServerKey = fcmServerKey;
        this.fcmTokenRepository = fcmTokenRepository;
    }

    public void sendMessage(String to, String title, String body, double mt, String loc, double lat, double lon, String time) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("Authorization", "key=" + fcmServerKey);
    
        Map<String, Object> notification = new HashMap<>();
        notification.put("title", title);
        notification.put("body", body);
    
        // 위치 데이터를 추가합니다.
        Map<String, Object> data = new HashMap<>();
        data.put("title", title);
        data.put("body", body);
        data.put("mt", mt);
        data.put("loc", loc);
        data.put("lat", lat);
        data.put("lon", lon);
        data.put("time", time);

        Map<String, Object> message = new HashMap<>();
        message.put("to", to);
        message.put("data", data);
    
        HttpEntity<Map<String, Object>> request = new HttpEntity<>(message, headers);
        restTemplate.postForEntity(FCM_API_URL, request, Void.class);
    }

    public FCMTokenEntity saveToken(FCMTokenEntity fcmTokenEntity) {
        FCMTokenEntity savedEntity = fcmTokenRepository.save(fcmTokenEntity);
        logger.info("Saved token: " + savedEntity.getFCMToken());
        return savedEntity;
    }
}
