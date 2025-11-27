package com.example.demo.Dto;

import com.example.demo.Model.Roles;
import lombok.Data;

import java.util.Set;
@Data
public class RegisterRequest {
    private String userName;
    private String email;
    private String password;
    private Set<Roles> roles; // e.g., ["USER"], ["ADMIN"]
}
