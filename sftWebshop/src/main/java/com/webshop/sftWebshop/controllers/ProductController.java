package com.webshop.sftWebshop.controllers;

import com.webshop.sftWebshop.DTOs.ProductDTO;
import com.webshop.sftWebshop.DTOs.ProductSearchResponse;
import com.webshop.sftWebshop.services.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController("/product")
@RequiredArgsConstructor
public class ProductController {
    private final ProductService productService;

    @GetMapping("/product/save")
    public ResponseEntity<Void> saveProduct(@RequestBody ProductDTO productDTO){
productService.saveProduct(productDTO);

return ResponseEntity.ok().build();
    }

    @GetMapping("/product/{name}")
    public ResponseEntity<ProductSearchResponse> findProduct(@PathVariable("{name}") String productName){
        ProductSearchResponse dto = productService.findProduct(productName);

       return ResponseEntity.ok(dto);
    }

}
