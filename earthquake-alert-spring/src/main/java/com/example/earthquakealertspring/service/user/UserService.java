package com.example.earthquakealertspring.service.user;

import com.example.earthquakealertspring.dto.FavoritePlaceDto;
import com.example.earthquakealertspring.dto.ShelterDto;
import com.example.earthquakealertspring.dto.UserDto;
import com.example.earthquakealertspring.entity.FavoritePlace;
import com.example.earthquakealertspring.entity.Shelter;
import com.example.earthquakealertspring.entity.User;
import com.example.earthquakealertspring.repository.FavoritePlaceRepository;
import com.example.earthquakealertspring.repository.ShelterRepository;
import com.example.earthquakealertspring.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private FavoritePlaceRepository favoritePlaceRepository;
    @Autowired
    private ShelterRepository shelterRepository;

    public ResponseEntity getUserInfo(String userId) {
        try {
            User user = userRepository.findByUserId(Long.parseLong(userId));
            if (user == null) {
                log.info("Get user info: User {} does not exist", userId);
                return ResponseEntity.badRequest().body("Get user info: User does not exist");
            }
            List<FavoritePlaceDto> favoritePlaces = user.getFavoritePlaces().stream()
                    .map(favoritePlace -> FavoritePlaceDto.builder()
                            .placeId(Long.toString(favoritePlace.getFavoritePlaceId()))
                            .placeName(favoritePlace.getName())
                            .placeAddress(favoritePlace.getAddress())
                            .placeLat(favoritePlace.getLatitude())
                            .placeLng(favoritePlace.getLongitude())
                            .build())
                    .collect(Collectors.toList());
            UserDto userDto = UserDto.builder()
                    .userId(Long.toString(user.getUserId()))
                    .name(user.getName())
                    .email(user.getEmail())
                    .favoritePlaces(favoritePlaces)
                    .build();
            return ResponseEntity.ok(userDto);
        } catch (Exception e) {
            log.error("Get user info: Error while getting user info", e);
            return ResponseEntity.badRequest().build();
        }
    }

    public ResponseEntity addFavoritePlace(String userId, FavoritePlaceDto favoritePlaceDto) {
        try {
            User user = userRepository.findByUserId(Long.parseLong(userId));
            if (user == null) {
                log.info("Add favorite place: User {} does not exist", userId);
                return ResponseEntity.badRequest().body("Add favorite: User does not exist");
            }
            if (user.getFavoritePlaces().size() == 5) {
                log.info("Add favorite place: User {} already has 5 favorite places", userId);
                return ResponseEntity.badRequest().body("Add favorite place: You can only add 5 favorite places");
            }
            FavoritePlace favoritePlace = FavoritePlace.builder()
                    .name(favoritePlaceDto.getPlaceName())
                    .address(favoritePlaceDto.getPlaceAddress())
                    .latitude(favoritePlaceDto.getPlaceLat())
                    .longitude(favoritePlaceDto.getPlaceLng())
                    .build();
            favoritePlace.setUser(user);
            favoritePlaceRepository.save(favoritePlace);
            FavoritePlaceDto favoritePlaceResponseDto = FavoritePlaceDto.builder()
                    .placeId(Long.toString(favoritePlace.getFavoritePlaceId()))
                    .placeName(favoritePlace.getName())
                    .placeAddress(favoritePlace.getAddress())
                    .placeLat(favoritePlace.getLatitude())
                    .placeLng(favoritePlace.getLongitude())
                    .build();
            return ResponseEntity.ok().body(favoritePlaceResponseDto);
        } catch (Exception e) {
            log.error("Add favorite place: Error while getting user info", e);
            return ResponseEntity.badRequest().build();
        }
    }

    public ResponseEntity updateFavoritePlace(String userId, String favoritePlaceId, FavoritePlaceDto
            favoritePlaceDto) {
        try {
            User user = userRepository.findByUserId(Long.parseLong(userId));
            if (user == null) {
                log.info("Update favorite place: User {} does not exist", userId);
                return ResponseEntity.badRequest().body("Update favorite place: User does not exist");
            }

            FavoritePlace favoritePlace = favoritePlaceRepository.findByFavoritePlaceId(Long.parseLong(favoritePlaceId));
            if (favoritePlace == null) {
                log.info("Update favorite place: Favorite place {} does not exist", favoritePlaceId);
                return ResponseEntity.badRequest().body("Update favorite place: Favorite place does not exist");
            }

            favoritePlace.setName(favoritePlaceDto.getPlaceName());
            favoritePlaceRepository.save(favoritePlace);

            FavoritePlaceDto favoritePlaceResponseDto = FavoritePlaceDto.builder()
                    .placeId(Long.toString(favoritePlace.getFavoritePlaceId()))
                    .placeName(favoritePlace.getName())
                    .placeAddress(favoritePlace.getAddress())
                    .placeLat(favoritePlace.getLatitude())
                    .placeLng(favoritePlace.getLongitude())
                    .build();

            return ResponseEntity.ok().body(favoritePlaceResponseDto);
        } catch (Exception e) {
            log.error("Update favorite place: Error while updating favorite place", e);
            return ResponseEntity.badRequest().body("Update favorite place: Error while updating favorite place");
        }
    }


    public ResponseEntity deleteFavoritePlace(String userId, String favoritePlaceId) {
        try {
            User user = userRepository.findByUserId(Long.parseLong(userId));
            if (user == null) {
                log.info("Delete favorite place: User {} does not exist", userId);
                return ResponseEntity.badRequest().body("Delete favorite place: User does not exist");
            }

            FavoritePlace favoritePlace = favoritePlaceRepository.findByFavoritePlaceId(Long.parseLong(favoritePlaceId));
            if (favoritePlace == null) {
                log.info("Delete favorite place: Favorite place {} does not exist", favoritePlaceId);
                return ResponseEntity.badRequest().body("Delete favorite place: Favorite place does not exist");
            }

            favoritePlaceRepository.delete(favoritePlace);
            return ResponseEntity.ok().body("Favorite place deleted");
        } catch (Exception e) {
            log.error("Delete favorite place: Error while deleting favorite place", e);
            return ResponseEntity.badRequest().body("Delete favorite place: Error while deleting favorite place");
        }
    }

    public ResponseEntity addShelter(String userId, String favoritePlaceId, ShelterDto shelterDto) {
        try {
            User user = userRepository.findByUserId(Long.parseLong(userId));
            if (user == null) {
                log.info("Add shelter: User {} does not exist", userId);
                return ResponseEntity.badRequest().body("Add shelter: User does not exist");
            }
            FavoritePlace favoritePlace = favoritePlaceRepository.findByFavoritePlaceId(Long.parseLong(favoritePlaceId));
            if (favoritePlace == null) {
                log.info("Add shelter: Favorite place {} does not exist", favoritePlaceId);
                return ResponseEntity.badRequest().body("Add shelter: Favorite place does not exist");
            }
            if (favoritePlace.getShelters().size() == 3) {
                log.info("Add shelter: Favorite place {} already has 3 shelters", favoritePlaceId);
                return ResponseEntity.badRequest().body("Add shelter: You can only add 3 shelters");
            }
            Shelter shelter = Shelter.builder()
                    .name(shelterDto.getShelterName())
                    .address(shelterDto.getShelterAddress())
                    .latitude(shelterDto.getShelterLat())
                    .longitude(shelterDto.getShelterLng())
                    .build();
            shelter.setFavoritePlace(favoritePlace);
            shelterRepository.save(shelter);
            ShelterDto shelterResponseDto = ShelterDto.builder()
                    .shelterId(Long.toString(shelter.getShelterId()))
                    .favoritePlaceId(Long.toString(favoritePlace.getFavoritePlaceId()))
                    .shelterName(shelter.getName())
                    .shelterAddress(shelter.getAddress())
                    .shelterLat(shelter.getLatitude())
                    .shelterLng(shelter.getLongitude())
                    .build();
            return ResponseEntity.ok().body(shelterResponseDto);
        } catch (Exception e) {
            log.error("Error while getting user info", e);
            return ResponseEntity.badRequest().build();
        }
    }

    public ResponseEntity getShelter(String userId, String favoritePlaceId) {
        try {
            User user = userRepository.findByUserId(Long.parseLong(userId));
            if (user == null) {
                log.info("Get shelter: User {} does not exist", userId);
                return ResponseEntity.badRequest().body("Get shelter: User does not exist");
            }
            FavoritePlace favoritePlace = favoritePlaceRepository.findByFavoritePlaceId(Long.parseLong(favoritePlaceId));
            if (favoritePlace == null) {
                log.info("Get shelter: Favorite place {} does not exist", favoritePlaceId);
                return ResponseEntity.badRequest().body("Get shelter: Favorite place does not exist");
            }
            List<Shelter> shelters = favoritePlace.getShelters();
            List<ShelterDto> shelterResponseDtos = shelters.stream()
                    .map(shelter -> ShelterDto.builder()
                            .shelterId(Long.toString(shelter.getShelterId()))
                            .favoritePlaceId(favoritePlaceId)
                            .shelterName(shelter.getName())
                            .shelterAddress(shelter.getAddress())
                            .shelterLat(shelter.getLatitude())
                            .shelterLng(shelter.getLongitude())
                            .shelterMemo(shelter.getMemo())
                            .build())
                    .collect(Collectors.toList());
            return ResponseEntity.ok().body(Collections.singletonMap("shelters", shelterResponseDtos));
        } catch (Exception e) {
            log.error("Error while getting user info", e);
            return ResponseEntity.badRequest().build();
        }
    }

    public ResponseEntity updateShelter(String userId, String favoritePlaceId, String shelterId, ShelterDto
            shelterDto) {
        try {
            User user = userRepository.findByUserId(Long.parseLong(userId));
            if (user == null) {
                log.info("Update shelter: User {} does not exist", userId);
                return ResponseEntity.badRequest().body("Update shelter: User does not exist");
            }
            FavoritePlace favoritePlace = favoritePlaceRepository.findByFavoritePlaceId(Long.parseLong(favoritePlaceId));
            if (favoritePlace == null) {
                log.info("Update shelter: Favorite place {} does not exist", favoritePlaceId);
                return ResponseEntity.badRequest().body("Update shelter: Favorite place does not exist");
            }
            Shelter shelter = shelterRepository.findByShelterId(Long.parseLong(shelterId));
            if (shelter == null) {
                log.info("Update shelter: Shelter {} does not exist", shelterId);
                return ResponseEntity.badRequest().body("Update shelter: Shelter does not exist");
            }
            shelter.setName(shelterDto.getShelterName());
            shelterRepository.save(shelter);
            ShelterDto shelterResponseDto = ShelterDto.builder()
                    .shelterId(Long.toString(shelter.getShelterId()))
                    .favoritePlaceId(Long.toString(favoritePlace.getFavoritePlaceId()))
                    .shelterName(shelter.getName())
                    .shelterAddress(shelter.getAddress())
                    .shelterLat(shelter.getLatitude())
                    .shelterLng(shelter.getLongitude())
                    .build();
            return ResponseEntity.ok().body(shelterResponseDto);
        } catch (Exception e) {
            log.error("Error while getting user info", e);
            return ResponseEntity.badRequest().build();
        }
    }

    public ResponseEntity deleteShelter(String userId, String favoritePlaceId, String shelterId) {
        try {
            User user = userRepository.findByUserId(Long.parseLong(userId));
            if (user == null) {
                log.info("Delete shelter: User {} does not exist", userId);
                return ResponseEntity.badRequest().body("Delete shelter: User does not exist");
            }
            FavoritePlace favoritePlace = favoritePlaceRepository.findByFavoritePlaceId(Long.parseLong(favoritePlaceId));
            if (favoritePlace == null) {
                log.info("Delete shelter: Favorite place {} does not exist", favoritePlaceId);
                return ResponseEntity.badRequest().body("Delete shelter: Favorite place does not exist");
            }
            Shelter shelter = shelterRepository.findByShelterId(Long.parseLong(shelterId));
            if (shelter == null) {
                log.info("Delete shelter: Shelter {} does not exist", shelterId);
                return ResponseEntity.badRequest().body("Delete shelter: Shelter does not exist");
            }
            shelterRepository.delete(shelter);
            return ResponseEntity.ok().body("Shelter deleted");
        } catch (Exception e) {
            log.error("Error while getting user info", e);
            return ResponseEntity.badRequest().build();
        }
    }
}
