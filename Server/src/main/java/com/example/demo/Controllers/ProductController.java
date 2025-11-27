package com.example.demo.Controllers;

import com.example.demo.Model.Products;

import com.example.demo.Services.ProductServices;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductServices productServices;

    /** Add product (category must exist) */
    @PostMapping("/add")
    public ResponseEntity<?> addProduct(@RequestBody Products product) {
        try {
            Products added = productServices.addProduct(product);
            return ResponseEntity.status(HttpStatus.CREATED).body(added);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    /** Get all products */
    @GetMapping("/all")
    public ResponseEntity<?> getAllProducts() {
        return ResponseEntity.ok(productServices.getAllProducts());
    }

    /** Get product by ID */
    @GetMapping("/{id}")
    public ResponseEntity<?> getProductById(@PathVariable String id) {
        try {
            return ResponseEntity.ok(productServices.getProductById(id));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }
}
