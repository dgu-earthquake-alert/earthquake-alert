package com.example.earthquakealertspring.entity;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FavoritePlace {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "favorite_place_id")
    private Long favoritePlaceId;

    @JoinColumn(name = "user_id")
    @ManyToOne(fetch = FetchType.LAZY)
    private User user;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String address;

    @Column(nullable = false)
    private String latitude;

    @Column(nullable = false)
    private String longitude;

    @OneToMany(mappedBy = "favoritePlace", cascade = CascadeType.ALL)
    private List<Shelter> shelters;

    public void setUser(User user) {
        this.user = user;
    }

    public void setShelters(List<Shelter> shelters) {
        this.shelters = shelters;
    }
}
