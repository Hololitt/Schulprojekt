package com.webshop.sftWebshop.DTOs;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ProductSearchResponse {
    private ProductDTO productDTO;
    private boolean isFound;
}
