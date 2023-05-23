package com.example.earthquakealertspring.service;

import com.example.earthquakealertspring.dto.EarthquakeResponse;
import com.example.earthquakealertspring.dto.EarthquakeData;
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
    private final FCMTokenService fcmTokenService;
    private final FCMTokenRepository fcmTokenRepository;
    private EarthquakeData lastSentData;
    private final String serviceKey;
    public EarthquakePushService(RestTemplate restTemplate, @Value("${api.earthquake-api.service-key}") String serviceKey, FCMTokenService fcmTokenService, FCMTokenRepository fcmTokenRepository) {
        this.restTemplate = restTemplate;
        this.serviceKey = serviceKey;
        this.fcmTokenService = fcmTokenService;
        this.fcmTokenRepository = fcmTokenRepository;
    }

    @Scheduled(fixedRate = 60000)
    public void sendPushNotification() {
        EarthquakeResponse response = restTemplate.getForObject(EARTHQUAKE_API_URL, EarthquakeResponse.class);
        EarthquakeData newData = response.getResponse().getBody().getItems().getEarthquakeData();

        if (newData == null) {
            return;
        }

        if (lastSentData != null && lastSentData.equals(newData)) {
            return;
        }

        if (Double.parseDouble(newData.getMt()) >= 5.0) {
            sendFCMPushNotification(newData);
            lastSentData = newData;
        }
    }

    private void sendFCMPushNotification(EarthquakeData earthquakeData) {
        List<FCMTokenEntity> tokens = fcmTokenRepository.findAll();

        for (FCMTokenEntity tokenEntity : tokens) {
            String title = "지진 알림";
            String body = String.format("규모 %s 지진이 발생했습니다. 위치: %s \n인근에 계신 분들은 빠르게 대피하십시오.", earthquakeData.getMt(), earthquakeData.getLoc());
            fcmTokenService.sendMessage(tokenEntity.getToken(), title, body);
        }
    }
}
