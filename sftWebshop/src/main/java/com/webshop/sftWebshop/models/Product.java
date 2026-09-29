package com.webshop.sftWebshop.models;

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

    @Column(name = "name")
    private String productName;

    @Column(name = "description")
    private String productDescription;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}
