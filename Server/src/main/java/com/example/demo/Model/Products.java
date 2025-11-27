package com.example.demo.Model;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "products")
public class Products {
  @Id
  private  String id;

    private String productName;
    private String description;
    private String category_id;
    private List<ProductVariants> productVariants;





}
