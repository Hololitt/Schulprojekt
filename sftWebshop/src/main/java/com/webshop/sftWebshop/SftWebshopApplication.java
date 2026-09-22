package com.webshop.sftWebshop;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class SftWebshopApplication {

	public static void main(String[] args) {
		System.out.println(System.getProperty("java.version"));
		SpringApplication.run(SftWebshopApplication.class, args);
	}

}
