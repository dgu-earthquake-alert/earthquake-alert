package com.example.earthquakealertspring.controller;

import com.example.earthquakealertspring.dto.FavoritePlaceDto;
import com.example.earthquakealertspring.dto.ShelterDto;
import com.example.earthquakealertspring.service.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("user")
public class UserController {
    @Autowired
    private UserService userService;
    @GetMapping
    public ResponseEntity getUser(@AuthenticationPrincipal String userId) {
        return userService.getUserInfo(userId);
    }

    @PostMapping("/favorite")
    public ResponseEntity addFavoritePlace(@AuthenticationPrincipal String userId, @RequestBody FavoritePlaceDto favoritePlaceDto) {
        return userService.addFavoritePlace(userId, favoritePlaceDto);
    }

    @DeleteMapping("/favorite/{favoritePlaceId}")
    public ResponseEntity deleteFavoritePlace(@AuthenticationPrincipal String userId, @PathVariable String favoritePlaceId) {
        return userService.deleteFavoritePlace(userId, favoritePlaceId);
    }

    @PutMapping("/favorite/{favoritePlaceId}")
    public ResponseEntity updateFavoritePlace(@AuthenticationPrincipal String userId, @PathVariable String favoritePlaceId, @RequestBody FavoritePlaceDto favoritePlaceDto) {
        return userService.updateFavoritePlace(userId, favoritePlaceId, favoritePlaceDto);
    }

    @PostMapping("/favorite/{favoritePlaceId}/shelter")
    public ResponseEntity addShelter(@AuthenticationPrincipal String userId, @PathVariable String favoritePlaceId, @RequestBody ShelterDto shelterDto) {
        return userService.addShelter(userId, favoritePlaceId, shelterDto);
    }

    @GetMapping("/favorite/{favoritePlaceId}/shelter")
    public ResponseEntity getShelter(@AuthenticationPrincipal String userId, @PathVariable String favoritePlaceId) {
        return userService.getShelter(userId, favoritePlaceId);
    }

    @PutMapping("/favorite/{favoritePlaceId}/shelter/{shelterId}")
    public ResponseEntity updateShelter(@AuthenticationPrincipal String userId, @PathVariable String favoritePlaceId, @PathVariable String shelterId, @RequestBody ShelterDto shelterDto) {
        return userService.updateShelter(userId, favoritePlaceId, shelterId, shelterDto);
    }

    @DeleteMapping("/favorite/{favoritePlaceId}/shelter/{shelterId}")
    public ResponseEntity deleteShelter(@AuthenticationPrincipal String userId, @PathVariable String favoritePlaceId, @PathVariable String shelterId) {
        return userService.deleteShelter(userId, favoritePlaceId, shelterId);
    }

    @PostMapping("/favorite/{favoritePlaceId}/shelter/{shelterId}/memo")
    public ResponseEntity addShelterMemo(@AuthenticationPrincipal String userId, @PathVariable String favoritePlaceId, @PathVariable String shelterId, @RequestBody ShelterDto shelterDto) {
        return userService.addShelterMemo(userId, favoritePlaceId, shelterId, shelterDto.getShelterMemo());
    }

    @PutMapping("/favorite/{favoritePlaceId}/shelter/{shelterId}/memo")
    public ResponseEntity updateShelterMemo(@AuthenticationPrincipal String userId, @PathVariable String favoritePlaceId, @PathVariable String shelterId, @RequestBody ShelterDto shelterDto) {
        return userService.updateShelterMemo(userId, favoritePlaceId, shelterId, shelterDto.getShelterMemo());
    }

    @DeleteMapping("/favorite/{favoritePlaceId}/shelter/{shelterId}/memo")
    public ResponseEntity deleteShelterMemo(@AuthenticationPrincipal String userId, @PathVariable String favoritePlaceId, @PathVariable String shelterId) {
        return userService.deleteShelterMemo(userId, favoritePlaceId, shelterId);
    }

}
