package com.webshop.sftWebshop.DTOs;


public record ProductDTO(Integer productId,
        String title,
        String description,
        Double price,
       String sellerUsername) {
}
