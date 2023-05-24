package com.example.earthquakealertspring.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class FavoritePlaceDto {
    private String placeId;
    private String placeName;
    private String placeAddress;
    private String placeLat;
    private String placeLng;

}
