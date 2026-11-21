package com.webshop.sftWebshop.DTOs;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public record ProductCreationForm(
       @NotBlank String title,
       @NotBlank String description,
       @NotNull @Positive Double price
){
}
