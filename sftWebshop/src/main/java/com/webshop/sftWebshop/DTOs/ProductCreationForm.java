package com.webshop.sftWebshop.DTOs;

public record ProductCreationForm(
        String title,
        String description,
        Double price
){
}
