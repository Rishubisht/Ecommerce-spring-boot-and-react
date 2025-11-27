package com.example.demo.Services;

import com.example.demo.Model.Users;
import com.example.demo.Repository.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService {
    private final UserRepository userRepo;

    public CustomUserDetailsService(UserRepository userRepo) {
        this.userRepo = userRepo;
    }

    @Override
    public UserDetails loadUserByUsername(String userNameOrEmail) {
        Users user = userRepo.findByUserName(userNameOrEmail)
                .or(()->userRepo.findByEmail(userNameOrEmail))
                .orElseThrow(() -> new UsernameNotFoundException("user not found"));

        return org.springframework.security.core.userdetails.User
                .withUsername(user.getUserName())
                .password(user.getPassword())
                .authorities(user.getRoles().stream().map(Enum::name).toArray(String[]::new))
                .build();
    }
}
