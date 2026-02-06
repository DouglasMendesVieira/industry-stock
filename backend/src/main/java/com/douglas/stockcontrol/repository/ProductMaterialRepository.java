package com.douglas.stockcontrol.repository;

import com.douglas.stockcontrol.domain.ProductMaterial;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class ProductMaterialRepository implements PanacheRepository<ProductMaterial> {
}

