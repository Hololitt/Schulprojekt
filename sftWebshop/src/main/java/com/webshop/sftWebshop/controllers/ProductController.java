package com.webshop.sftWebshop.controllers;

import com.webshop.sftWebshop.DTOs.ProductCreationForm;
import com.webshop.sftWebshop.DTOs.ProductDTO;
import com.webshop.sftWebshop.config.CurrentUserProvider;
import com.webshop.sftWebshop.enums.OperationStatus;
import com.webshop.sftWebshop.services.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.nio.file.AccessDeniedException;
import java.util.List;

@RestController("/product")
@RequiredArgsConstructor
public class ProductController {
    private final ProductService productService;
    private final CurrentUserProvider currentUserProvider;


    @GetMapping("/product/save")
    public ResponseEntity<HttpStatus> saveProduct(@RequestBody ProductCreationForm form) throws AccessDeniedException {

        Integer userId = currentUserProvider.getUserId();
productService.saveProduct(form, userId);

return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @GetMapping("/product/{title}")
    public ResponseEntity<List<ProductDTO>> findProduct(@PathVariable("{title}") String title){
        List<ProductDTO> productDTOS = productService.searchProductsByTitle(title);
       return ResponseEntity.ok(productDTOS);
    }

    @DeleteMapping("/delete/{id}")
public ResponseEntity<HttpStatus> deleteProduct(@PathVariable("{id}") Integer productId) throws AccessDeniedException {

        Integer userId = currentUserProvider.getUserId();

       OperationStatus operationStatus = productService.deleteProduct(productId, userId);

       if(operationStatus.equals(OperationStatus.SUCCESSFUL)){
           return ResponseEntity.status(HttpStatus.OK).build();
       }else{
           return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
       }

    }
}
