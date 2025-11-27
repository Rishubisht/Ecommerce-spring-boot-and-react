package com.example.demo.Repository;



import com.example.demo.Model.Users;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;
@Repository
public interface UserRepository extends MongoRepository<Users, String> {
    Optional<Users> findByUserName(String userName);
    @Query("{ '$or': [ { 'userName': ?0 }, { 'email': ?0 } ] }")
    Optional<Users> findByUserNameOrEmail(String value);
    Optional<Users> findByEmail(String email);
    Boolean existsByUserName(String userName);
    Boolean existsByEmail(String email);

    @Query("{ '$or': [ { 'userName': ?0 }, { 'email': ?1 } ] }")
    Optional<Users> existsByUserNameOrEmail(String userName, String email);

}

