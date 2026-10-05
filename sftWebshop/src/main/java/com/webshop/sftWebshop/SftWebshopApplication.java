package com.webshop.sftWebshop;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan("com.webshop.sftWebshop")
public class SftWebshopApplication {

	public static void main(String[] args) {
		System.out.println(System.getProperty("java.version"));
		SpringApplication.run(SftWebshopApplication.class, args);
	}

}
