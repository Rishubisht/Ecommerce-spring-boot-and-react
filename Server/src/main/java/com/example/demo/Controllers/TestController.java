package com.example.demo.Controllers;

import com.example.demo.Services.EmailService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/auth")
public class TestController {
    private  final EmailService emailService;

    public TestController(EmailService emailService){
        this.emailService = emailService;
    }
    @GetMapping("/testEmail")
    public ResponseEntity<?> test(HttpServletRequest req){
        System.out.println(req.getRequestURL());
//        emailService.sendEmail("bishtpriyansh77@gmail.com","testing","test done");
//        System.out.println(req.getAuthType());
        return ResponseEntity.status(200).body("ok");
    }





}
