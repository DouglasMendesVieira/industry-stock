package com.douglas.stockcontrol.service;

import com.douglas.stockcontrol.domain.RawMaterial;
import com.douglas.stockcontrol.repository.RawMaterialRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.transaction.Transactional;

import java.util.List;

@ApplicationScoped
public class RawMaterialService {

    private final RawMaterialRepository repository;

    public RawMaterialService(RawMaterialRepository repository) {
        this.repository = repository;
    }

    public List<RawMaterial> listAll() {
        return repository.listAll();
    }

    public RawMaterial findById(Long id) {
        return repository.findById(id);
    }

    @Transactional
    public RawMaterial create(RawMaterial material) {
        repository.persist(material);
        return material;
    }

    @Transactional
    public RawMaterial update(Long id, RawMaterial updated) {

        RawMaterial material = repository.findById(id);

        if (material == null) {
            throw new RuntimeException("Raw material not found");
        }

        material.name = updated.name;
        material.stockQuantity = updated.stockQuantity;

        return material;
    }

    @Transactional
    public void delete(Long id) {
        repository.deleteById(id);
    }
}
