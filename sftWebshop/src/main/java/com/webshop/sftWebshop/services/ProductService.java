package com.webshop.sftWebshop.services;

import com.webshop.sftWebshop.DTOs.ProductCreationForm;
import com.webshop.sftWebshop.DTOs.ProductDTO;
import com.webshop.sftWebshop.DTOs.ProductSearchResponse;
import com.webshop.sftWebshop.DTOs.UserSearchResponse;
import com.webshop.sftWebshop.config.CurrentUserProvider;
import com.webshop.sftWebshop.enums.OperationStatus;
import com.webshop.sftWebshop.models.Product;
import com.webshop.sftWebshop.models.User;
import com.webshop.sftWebshop.repositories.ProductRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.nio.file.AccessDeniedException;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductService {
    private final ProductRepository productRepository;
    private final UserService userService;

    public void saveProduct(ProductCreationForm form, Integer userId) {
        UserSearchResponse response = userService.findUserByUserId(userId);

        User currentUser = response.getUser();

        Product newProduct = Product.builder()
                        .title(form.title())
                                .description(form.description())
                                        .price(form.price())
                                                .owner(currentUser)
                                                        .build();

productRepository.save(newProduct);
    }

    public List<ProductDTO> searchProductsByTitle(String title){
List<Product> products = productRepository.findAllByTitle(title);

List<ProductDTO> productsDTO = new ArrayList<>();

for(Product p : products){
    ProductDTO productDTO = convertToProductDTO(p);
productsDTO.add(productDTO);
}

return productsDTO;
    }



    private ProductDTO convertToProductDTO(Product product){
        return new ProductDTO(product.getProductId(),
                product.getTitle(),
                product.getDescription(),
                product.getPrice()
        ,product.getOwner().getUsername());
    }

    @Transactional
    public OperationStatus deleteProduct(Integer productId, Integer userId) {
        int rowsDeleted = productRepository.deleteByIdAndOwnerId(productId, userId);

        if (rowsDeleted == 0) {
return OperationStatus.FAILED;
        }

        return OperationStatus.SUCCESSFUL;
    }
}
