package com.example.demo.Repository;

import com.example.demo.Model.Categories;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface CategoryRepository extends MongoRepository<Categories,String> {

    boolean existsByCategoryName(String name);

}
