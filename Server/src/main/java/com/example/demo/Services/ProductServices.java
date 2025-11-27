package com.example.demo.Services;

import com.example.demo.Model.Products;
import com.example.demo.Repository.ProductRepository;
import com.example.demo.Repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductServices {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;

    /** Add Product Only If Category Exists */
    public Products addProduct(Products product) {

        if (!categoryRepository.existsById(product.getCategory_id())) {
            throw new RuntimeException("Category does not exist. Cannot add product.");
        }

        return productRepository.save(product);
    }

    /** Get all products */
    public List<Products> getAllProducts() {
        return productRepository.findAll();
    }

    /** Get product by id */
    public Products getProductById(String id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));
    }
}
