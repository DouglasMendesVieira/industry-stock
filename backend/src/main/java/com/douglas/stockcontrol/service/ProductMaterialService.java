package com.douglas.stockcontrol.service;

import com.douglas.stockcontrol.domain.Product;
import com.douglas.stockcontrol.domain.ProductMaterial;
import com.douglas.stockcontrol.domain.RawMaterial;
import com.douglas.stockcontrol.dto.AddMaterialToProductDTO;
import com.douglas.stockcontrol.repository.ProductMaterialRepository;
import com.douglas.stockcontrol.repository.ProductRepository;
import com.douglas.stockcontrol.repository.RawMaterialRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.transaction.Transactional;

import java.util.List;

@ApplicationScoped
public class ProductMaterialService {

    private final ProductRepository productRepository;
    private final RawMaterialRepository rawMaterialRepository;
    private final ProductMaterialRepository repository;

    public ProductMaterialService(ProductRepository productRepository,
                                  RawMaterialRepository rawMaterialRepository,
                                  ProductMaterialRepository repository) {
        this.productRepository = productRepository;
        this.rawMaterialRepository = rawMaterialRepository;
        this.repository = repository;
    }

    @Transactional
    public ProductMaterial addMaterial(Long productId, AddMaterialToProductDTO dto) {

        Product product = productRepository.findById(productId);
        RawMaterial material = rawMaterialRepository.findById(dto.rawMaterialId);

        if (product == null) {
            throw new RuntimeException("Product not found");
        }

        if (material == null) {
            throw new RuntimeException("Raw material not found");
        }

        ProductMaterial pm = new ProductMaterial();
        pm.product = product;
        pm.rawMaterial = material;
        pm.quantity = dto.quantity;

        repository.persist(pm);

        return pm;
    }

    public List<ProductMaterial> listByProduct(Long productId) {
        return repository.list("product.id", productId);
    }

    @Transactional
    public void delete(Long id) {
        repository.deleteById(id);
    }
}
