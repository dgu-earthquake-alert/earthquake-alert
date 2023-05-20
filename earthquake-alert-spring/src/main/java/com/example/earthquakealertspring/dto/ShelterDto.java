package com.example.earthquakealertspring.dto;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class ShelterDto {
    private String shelterId;
    private String favoritePlaceId;
    private String shelterName;
    private String shelterAddress;
    private String shelterLat;
    private String shelterLng;
    private String shelterMemo;
}
