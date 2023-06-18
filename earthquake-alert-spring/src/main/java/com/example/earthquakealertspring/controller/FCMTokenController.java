package com.example.earthquakealertspring.controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.earthquakealertspring.service.FCMTokenService;
import com.example.earthquakealertspring.entity.FCMTokenEntity;
import com.example.earthquakealertspring.repository.FCMTokenRepository;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Optional;

import lombok.Getter;
import lombok.Setter;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.beans.factory.annotation.Autowired;

@RestController
public class FCMTokenController {
    private final Logger logger = LoggerFactory.getLogger(FCMTokenController.class);

    private final FCMTokenService fcmTokenService;
    private final FCMTokenRepository fcmTokenRepository;

    @Autowired
    public FCMTokenController(FCMTokenService fcmTokenService, FCMTokenRepository fcmTokenRepository) {
        this.fcmTokenService = fcmTokenService;
        this.fcmTokenRepository = fcmTokenRepository;
    }

    @Getter @Setter @Builder @NoArgsConstructor @AllArgsConstructor
    public static class FCMTokenVo {
        @JsonProperty("fcmtoken")
        private String FCMToken;
    }

    @PostMapping("/api/register-token")
    public ResponseEntity<String> registerToken(@RequestBody FCMTokenVo fcmTokenVo) {
        logger.info("Received token: " + fcmTokenVo.getFCMToken());
    
        // 토큰이 null인 경우
        if (fcmTokenVo.getFCMToken() == null) {
            logger.error("FCMToken is null!");
            return new ResponseEntity<>("FCMToken이 null입니다.", HttpStatus.BAD_REQUEST);
        }
    
        // 이미 해당 토큰이 존재하는 경우
        Optional<FCMTokenEntity> existingToken = fcmTokenRepository.findByFCMToken(fcmTokenVo.getFCMToken());
        if (existingToken.isPresent()) {
            return new ResponseEntity<>("이미 푸시알림 수신이 등록된 디바이스입니다.", HttpStatus.OK);
        }
    
        FCMTokenEntity fcmTokenEntity = new FCMTokenEntity();
        fcmTokenEntity.setFCMToken(fcmTokenVo.getFCMToken());
        fcmTokenService.saveToken(fcmTokenEntity);
    
        return new ResponseEntity<>("푸시 알림 수신이 정상적으로 등록되었습니다.",HttpStatus.OK);
    }
    

}