package com.example.demo.Repository;

import com.example.demo.Model.Orders;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface OrderRepository extends MongoRepository<Orders, String> {
    
}
