package com.example.earthquakealertspring.controller;

import com.example.earthquakealertspring.dto.FavoritePlaceDto;
import com.example.earthquakealertspring.dto.ShelterDto;
import com.example.earthquakealertspring.service.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/user")
public class UserController {
    @Autowired
    private UserService userService;
    @GetMapping
    public ResponseEntity getUser(@AuthenticationPrincipal String userId) {
        return userService.getUserInfo(userId);
    }

    @DeleteMapping
    public ResponseEntity deleteUser(@AuthenticationPrincipal String userId) {
        return userService.deleteUserInfo(userId);
    }

    @PostMapping("/favorite")
    public ResponseEntity addFavoritePlace(@AuthenticationPrincipal String userId, @RequestBody FavoritePlaceDto favoritePlaceDto) {
        return userService.addFavoritePlace(userId, favoritePlaceDto);
    }

    @DeleteMapping("/favorite/{favoritePlaceId}")
    public ResponseEntity deleteFavoritePlace(@AuthenticationPrincipal String userId, @PathVariable String favoritePlaceId) {
        return userService.deleteFavoritePlace(userId, favoritePlaceId);
    }

    @GetMapping("/favorite")
    public ResponseEntity getFavoritePlaces(@AuthenticationPrincipal String userId) {
        return userService.getFavoritePlaces(userId);
    }
}
