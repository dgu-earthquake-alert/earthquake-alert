package com.example.earthquakealertspring.dto;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class UserDto {
    private String userId;
    private String name;
    private String email;
    private List<FavoritePlaceDto> favoritePlaces;
}
