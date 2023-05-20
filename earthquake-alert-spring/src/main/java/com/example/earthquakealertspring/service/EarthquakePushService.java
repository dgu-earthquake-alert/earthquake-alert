package com.example.earthquakealertspring.service;

import com.example.earthquakealertspring.dto.EarthquakeResponse;
import com.example.earthquakealertspring.dto.EarthquakeResponse.Item;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import com.example.earthquakealertspring.repository.FCMTokenRepository;
import com.example.earthquakealertspring.entity.FCMTokenEntity;
import org.springframework.beans.factory.annotation.Value;
import java.util.List;

@Service
public class EarthquakePushService {

    private static final String EARTHQUAKE_API_URL = "https://apis.data.go.kr/1360000/EqkInfoService/getEqkMsg?serviceKey={serviceKey}&numOfRows=10&pageNo=1&dataType=json&fromTmFc=20190907&toTmFc=20190907";
    private final RestTemplate restTemplate;
    private final FcmService fcmService;
    private final FCMTokenRepository fcmTokenRepository;
    private Item lastSentItem;
    private final String serviceKey;
    public EarthquakePushService(RestTemplate restTemplate, @Value("${api.earthquake-api.service-key}") String serviceKey, FcmService fcmService, FCMTokenRepository fcmTokenRepository) {
        this.restTemplate = restTemplate;
        this.serviceKey = serviceKey;
        this.fcmService = fcmService;
        this.fcmTokenRepository = fcmTokenRepository;
    }

    @Scheduled(fixedRate = 60000)
    public void sendPushNotification() {
        EarthquakeResponse response = restTemplate.getForObject(EARTHQUAKE_API_URL, EarthquakeResponse.class);
        Item newItem = response.getResponse().getBody().getItems().getItem();

        if (newItem == null) {
            return;
        }

        if (lastSentItem != null && lastSentItem.equals(newItem)) {
            return;
        }

        if (Double.parseDouble(newItem.getMt()) >= 5.0) {
            sendFCMPushNotification(newItem);
            lastSentItem = newItem;
        }
    }

    private void sendFCMPushNotification(Item item) {
        List<FCMTokenEntity> tokens = fcmTokenRepository.findAll();

        for (FCMTokenEntity tokenEntity : tokens) {
            String title = "지진 알림";
            String body = String.format("규모 %s 지진이 발생했습니다. 위치: %s \n인근에 계신 분들은 빠르게 대피하십시오.", item.getMt(), item.getLoc());

            fcmService.sendMessage(tokenEntity.getToken(), title, body);
        }
    }
}
