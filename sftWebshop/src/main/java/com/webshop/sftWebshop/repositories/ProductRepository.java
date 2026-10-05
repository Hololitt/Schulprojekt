package com.webshop.sftWebshop.repositories;

import com.webshop.sftWebshop.models.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Integer> {
    List<Product> findAllByTitle(String title);


    @Modifying
    @Query("DELETE FROM Product p WHERE p.productId = :productId AND p.owner.userId = :userId")
    int deleteByIdAndOwnerId(Integer productId, Integer userId);
}
