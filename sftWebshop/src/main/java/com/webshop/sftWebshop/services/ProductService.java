package com.webshop.sftWebshop.services;

import com.webshop.sftWebshop.DTOs.ProductDTO;
import com.webshop.sftWebshop.DTOs.ProductSearchResponse;
import com.webshop.sftWebshop.models.Product;
import com.webshop.sftWebshop.repositories.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ProductService {
    private final ProductRepository productRepository;

    public void saveProduct(ProductDTO productDTO){
        Product newProduct = convertToProduct(productDTO);

productRepository.save(newProduct);
    }

    public ProductSearchResponse findProduct(String productName){
Product product = productRepository.findByProductName(productName);

if(product == null){
    return new ProductSearchResponse(null, false);
}

ProductDTO productDTO = convertToProductDTO(product);

return new ProductSearchResponse(productDTO, true);
    }

    private Product convertToProduct(ProductDTO productDTO){
        return new Product(productDTO.getProductName());
    }

    private ProductDTO convertToProductDTO(Product product){
        return new ProductDTO(product.getProductName());
    }
}
