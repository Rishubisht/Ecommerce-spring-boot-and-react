package com.example.demo.Repository;

import com.example.demo.Model.VerificationToken;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface VerificationTokenRepo extends MongoRepository<VerificationToken, String> {


    Optional<VerificationToken> findByToken(String token);
}

