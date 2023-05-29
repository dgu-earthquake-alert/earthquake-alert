package com.example.earthquakealertspring.entity;

import com.example.earthquakealertspring.service.security.EncryptionConverter;
import lombok.*;

import javax.persistence.*;
import java.util.List;

@Getter
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private long userId;

    @Column(nullable = false)
    @Convert(converter = EncryptionConverter.class)
    private String name;

    @Column(nullable = false)
    @Convert(converter = EncryptionConverter.class)
    private String email;

    @Column(nullable = true)
    private String password;

    @Column(nullable = false)
    @Convert(converter = EncryptionConverter.class)
    private String authProvider;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<FavoritePlace> favoritePlaces;

    public void setAuthProvider(String authProvider) {
        this.authProvider = authProvider;
    }
}