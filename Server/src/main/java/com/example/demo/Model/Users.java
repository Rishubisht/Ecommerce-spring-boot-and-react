package com.example.demo.Model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.HashSet;
import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "users")
public class Users {
    @Id
    private String id;

    @Indexed(unique = true)
    private String email;
    @Indexed(unique = true)
    private String userName;
    private String password;
    private Set<Roles> roles = new HashSet<>();
    private boolean isVerified = false;


}
