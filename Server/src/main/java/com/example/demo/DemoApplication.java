package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.data.mongo.MongoDataAutoConfiguration;
import org.springframework.boot.autoconfigure.mongo.MongoAutoConfiguration;
//  for testing purpose
//@SpringBootApplication(exclude = {
//		MongoAutoConfiguration.class,
//		MongoDataAutoConfiguration.class
//})
@SpringBootApplication()
public class DemoApplication {

	public static void main(String[] args) {

		SpringApplication.run(DemoApplication.class, args);
		System.out.println("running");

	}

}
