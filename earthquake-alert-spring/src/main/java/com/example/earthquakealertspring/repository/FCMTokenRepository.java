package com.example.earthquakealertspring.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.earthquakealertspring.entity.FCMTokenEntity;
@Repository
public interface FCMTokenRepository extends JpaRepository<FCMTokenEntity, Long> {
}
