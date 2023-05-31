package com.example.earthquakealertspring.entity;


import com.example.earthquakealertspring.service.security.EncryptionConverter;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Shelter {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "shelter_id")
    private Long shelterId;
    @JoinColumn(name = "favorite_place_id")
    @ManyToOne(fetch = FetchType.LAZY)
    private FavoritePlace favoritePlace;

    @Column(nullable = false)
    @Convert(converter = EncryptionConverter.class)
    private String address;

    @Column(nullable = false)
    @Convert(converter = EncryptionConverter.class)
    private String latitude;

    @Column(nullable = false)
    @Convert(converter = EncryptionConverter.class)
    private String longitude;

    public void setFavoritePlace(FavoritePlace favoritePlace) {
        this.favoritePlace = favoritePlace;
    }
}

