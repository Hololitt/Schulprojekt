package com.webshop.sftWebshop.models;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "product")
@Setter
@Getter
@Builder
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer productId;

    @Column(name = "title")
    private String title;

    @Column(name = "description")
    private String description;

    @Column(name="price")
    private Double price;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User owner;
}
