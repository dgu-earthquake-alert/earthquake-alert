package com.example.earthquakealertspring.repository;

import com.example.earthquakealertspring.entity.FavoritePlace;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FavoritePlaceRepository extends JpaRepository<FavoritePlace, Long> {
    FavoritePlace findByFavoritePlaceId(long parseLong);
}
