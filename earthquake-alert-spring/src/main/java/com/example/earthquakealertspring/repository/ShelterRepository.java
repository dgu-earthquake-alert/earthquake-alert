package com.example.earthquakealertspring.repository;

import com.example.earthquakealertspring.entity.Shelter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ShelterRepository extends JpaRepository<Shelter, Long> {
    Shelter findByShelterId(long parseLong);
}
