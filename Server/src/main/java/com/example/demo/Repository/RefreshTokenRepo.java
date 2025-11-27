package com.example.demo.Repository;

import com.example.demo.Model.RefreshToken;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface RefreshTokenRepo extends MongoRepository<RefreshToken, String> {
    Optional<RefreshToken> findByToken(String token);
    void deleteByUserId(String userId);
}
