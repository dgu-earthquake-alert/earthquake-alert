package com.example.earthquakealertspring.dto;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class FavoritePlaceDto {
    private String placeId;
    private String placeName;
    private String placeAddress;
    private String placeLat;
    private String placeLng;

    private List<ShelterDto> shelterDtoList;
}
