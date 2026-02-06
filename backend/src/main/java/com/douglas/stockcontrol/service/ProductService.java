package com.douglas.stockcontrol.service;

import com.douglas.stockcontrol.domain.Product;
import com.douglas.stockcontrol.repository.ProductRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.transaction.Transactional;

import java.util.List;

@ApplicationScoped
public class ProductService {

    private final ProductRepository repository;

    public ProductService(ProductRepository repository) {
        this.repository = repository;
    }

    public List<Product> listAll() {
        return repository.listAll();
    }

    public Product findById(Long id) {
        return repository.findById(id);
    }

    @Transactional
    public Product create(Product product) {
        repository.persist(product);
        return product;
    }

    @Transactional
    public Product update(Long id, Product updatedProduct) {

        Product product = repository.findById(id);

        if (product == null) {
            throw new RuntimeException("Product not found");
        }

        product.code = updatedProduct.code;
        product.name = updatedProduct.name;
        product.price = updatedProduct.price;

        return product;
    }

    @Transactional
    public void delete(Long id) {
        repository.deleteById(id);
    }
}
