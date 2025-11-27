package com.example.demo.Controllers;

import com.example.demo.Dto.CategoryRequest;
import com.example.demo.Dto.CategoryResponse;
import com.example.demo.Repository.CategoryRepository;
import com.example.demo.Services.CategoryServices;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class CategoryController {

    private final CategoryServices categoryServices;

    public CategoryController(CategoryServices categoryServices) {
        this.categoryServices = categoryServices;
    }

    @PostMapping("/add-category")
    public ResponseEntity<?> createCategory(@RequestBody CategoryRequest req) {

        CategoryResponse response = categoryServices.createCategory(req);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }
    @GetMapping("/getAll-category")
    public ResponseEntity<?> getAllCategories(){
        return ResponseEntity.ok(categoryServices.getAllCategories());
    }


    @GetMapping("/get-category/{id}")
    public ResponseEntity<?> getCategoryById(@PathVariable String id) {
        return ResponseEntity.ok(categoryServices.getCategoryById(id));
    }



}
