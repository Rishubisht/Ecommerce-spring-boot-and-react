package com.example.demo.Repository;

import com.example.demo.Model.Products;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ProductRepository extends MongoRepository<Products,String> {

    List<Products> findByProductNameIgnoreCase(String productName);
}
