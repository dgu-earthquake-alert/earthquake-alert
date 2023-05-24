package com.example.earthquakealertspring.repository;

import com.example.earthquakealertspring.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository <User, Long>{
    boolean existsByEmail(String email);
    User findByEmail(String email);
    User findByUserId(long parseLong);
}
