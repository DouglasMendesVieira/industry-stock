package com.douglas.stockcontrol.service;

import com.douglas.stockcontrol.domain.Product;
import com.douglas.stockcontrol.domain.ProductMaterial;
import com.douglas.stockcontrol.domain.RawMaterial;
import com.douglas.stockcontrol.dto.AddMaterialToProductDTO;
import com.douglas.stockcontrol.exception.BusinessException;
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
            throw new BusinessException("Product not found");
        }

        if (material == null) {
            throw new BusinessException("Raw material not found");
        }

        if (material.stockQuantity < dto.quantity) {
            throw new BusinessException("Insufficient stock");
        }

        boolean exists =
                repository.find(
                                "product.id=?1 and rawMaterial.id=?2",
                                productId,
                                dto.rawMaterialId
                        )
                        .firstResultOptional()
                        .isPresent();

        if (exists) {
            throw new BusinessException(
                    "Material already linked to this product"
            );
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

        ProductMaterial pm = repository.findById(id);

        if(pm == null){
            throw new BusinessException("Association not found");
        }

        repository.delete(pm);
    }
}
