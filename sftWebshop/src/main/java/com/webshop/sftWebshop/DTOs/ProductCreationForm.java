package com.webshop.sftWebshop.DTOs;

import jakarta.validation.constraints.NotBlank;

public record ProductCreationForm(
       @NotBlank String title,
       @NotBlank String description,
       @NotBlank Double price
){
}
