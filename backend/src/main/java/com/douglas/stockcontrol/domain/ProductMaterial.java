package com.douglas.stockcontrol.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import jakarta.persistence.*;

@Entity
@Table(name = "product_materials",
        uniqueConstraints = @UniqueConstraint(columnNames = {"product_id", "raw_material_id"}))
public class ProductMaterial extends PanacheEntityBase {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;

    @ManyToOne(optional = false)
    @JsonIgnore
    @JoinColumn(name = "product_id")
    public Product product;

    @ManyToOne(optional = false)
    @JoinColumn(name = "raw_material_id")
    public RawMaterial rawMaterial;

    @Column(nullable = false)
    public Integer quantity;
}
