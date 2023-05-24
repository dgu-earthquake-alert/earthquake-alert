package com.example.earthquakealertspring.service;

import com.example.earthquakealertspring.dto.EarthquakeResponse;
import com.example.earthquakealertspring.dto.EarthquakeDto;
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
    private final String serviceKey;
    private EarthquakeDto lastSentData;

    public EarthquakePushService(RestTemplate restTemplate, @Value("${api.earthquake-api.service-key}") String serviceKey, FCMTokenService fcmTokenService, FCMTokenRepository fcmTokenRepository) {
        this.restTemplate = restTemplate;
        this.serviceKey = serviceKey;
        this.fcmTokenService = fcmTokenService;
        this.fcmTokenRepository = fcmTokenRepository;
    }

    @Scheduled(fixedRate = 60000)
    public void sendPushNotification() {
        EarthquakeResponse response = restTemplate.getForObject(EARTHQUAKE_API_URL, EarthquakeResponse.class);
        EarthquakeDto newEarthquakeDto = response.getResponse().getBody().getItems().getEarthquakeDto();

        if (newEarthquakeDto == null) {
            return;
        }

        if (lastSentData != null && lastSentData.equals(newEarthquakeDto)) {
            return;
        }

        if (Double.parseDouble(newEarthquakeDto.getMt()) >= 5.0) {
            sendFCMPushNotification(newEarthquakeDto);

            lastSentData = newEarthquakeDto;
        }
    }

    private void sendFCMPushNotification(EarthquakeDto earthquakeDto) {
        List<FCMTokenEntity> tokens = fcmTokenRepository.findAll();

        for (FCMTokenEntity tokenEntity : tokens) {
            String title = "지진 알림";
            String body = String.format("규모 %s 지진이 발생했습니다. 위치: %s \n인근에 계신 분들은 빠르게 대피하십시오.", earthquakeDto.getMt(), earthquakeDto.getLoc());
            fcmTokenService.sendMessage(tokenEntity.getToken(), title, body);
        }
    }
}
