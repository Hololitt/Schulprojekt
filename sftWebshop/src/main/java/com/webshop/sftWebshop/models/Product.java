package com.webshop.sftWebshop.models;

import com.webshop.sftWebshop.DTOs.ProductDTO;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "product")
@Setter
@Getter
public class Product {
    public Product(String productName){
        this.productName = productName;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer productId;

    @Column(name = "productName")
    private String productName;
}
