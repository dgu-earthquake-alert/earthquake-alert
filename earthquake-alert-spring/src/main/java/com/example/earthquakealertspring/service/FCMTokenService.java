package com.example.earthquakealertspring.service;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import java.util.HashMap;
import java.util.Map;
import com.example.earthquakealertspring.entity.FCMTokenEntity;
import com.example.earthquakealertspring.repository.FCMTokenRepository;

@Service
public class FCMTokenService {

    private static final String FCM_API_URL = "https://fcm.googleapis.com/fcm/send";

    private final RestTemplate restTemplate;
    private final String fcmServerKey;
    private final FCMTokenRepository fcmTokenRepository;

    public FCMTokenService(RestTemplate restTemplate, @Value("${app.fcm.server-key}") String fcmServerKey, FCMTokenRepository fcmTokenRepository) {
        this.restTemplate = restTemplate;
        this.fcmServerKey = fcmServerKey;
        this.fcmTokenRepository = fcmTokenRepository;
    }

    public void sendMessage(String to, String title, String body) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("Authorization", "key=" + fcmServerKey);

        Map<String, Object> notification = new HashMap<>();
        notification.put("title", title);
        notification.put("body", body);

        Map<String, Object> message = new HashMap<>();
        message.put("to", to);
        message.put("notification", notification);

        HttpEntity<Map<String, Object>> request = new HttpEntity<>(message, headers);
        restTemplate.postForEntity(FCM_API_URL, request, Void.class);
    }

    public FCMTokenEntity saveToken(String FCMToken) {
        FCMTokenEntity fcmTokenEntity = new FCMTokenEntity();
        fcmTokenEntity.setToken(FCMToken);
        return fcmTokenRepository.save(fcmTokenEntity);
    }
}

