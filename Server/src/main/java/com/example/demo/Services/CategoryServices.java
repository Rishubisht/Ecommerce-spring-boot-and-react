package com.example.demo.Services;

import com.example.demo.Dto.CategoryRequest;
import com.example.demo.Dto.CategoryResponse;
import com.example.demo.Exception.DuplicateRecordException;
import com.example.demo.Model.Categories;
import com.example.demo.Repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service

public class CategoryServices {

    private final CategoryRepository categoryRepository;

    public CategoryServices(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }




    public CategoryResponse createCategory(CategoryRequest req) {

        if (categoryRepository.existsByCategoryName(req.getCategoryName())) {
            throw new DuplicateRecordException("Category already Exists");
        }

        Categories categories = new Categories();
        categories.setCategoryName(req.getCategoryName());
        categories.setDescription(req.getDescription());

        categoryRepository.save(categories);

        return new CategoryResponse(categories.getId(), categories.getCategoryName(), categories.getDescription());
    }

    public List<CategoryResponse> getAllCategories() {
        return categoryRepository.findAll().stream()
                .map(cat-> new CategoryResponse(
                        cat.getId(),
                        cat.getCategoryName(),
                        cat.getDescription()
                )).toList();

    }

    public CategoryResponse getCategoryById(String id) {

        Categories cat = categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Category not found"));

        return new CategoryResponse(cat.getId(), cat.getCategoryName(), cat.getDescription());
    }
}
