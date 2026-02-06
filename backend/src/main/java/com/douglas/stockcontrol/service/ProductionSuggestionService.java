package com.douglas.stockcontrol.service;

import com.douglas.stockcontrol.domain.Product;
import com.douglas.stockcontrol.domain.ProductMaterial;
import com.douglas.stockcontrol.domain.RawMaterial;
import com.douglas.stockcontrol.dto.ProductionSuggestionDTO;
import com.douglas.stockcontrol.dto.ProductionSuggestionItemDTO;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.transaction.Transactional;

import java.math.BigDecimal;
import java.util.*;

@ApplicationScoped
public class ProductionSuggestionService {

    @Transactional
    public ProductionSuggestionDTO calculate() {

        List<Product> products = Product.find(
                "select distinct p from Product p " +
                        "left join fetch p.materials pm " +
                        "left join fetch pm.rawMaterial"
        ).list();

        products.sort((p1, p2) -> p2.price.compareTo(p1.price));

        Map<Long, Integer> virtualStock = new HashMap<>();

        List<RawMaterial> materials = RawMaterial.listAll();

        for (RawMaterial m : materials) {
            virtualStock.put(m.id, m.stockQuantity);
        }

        List<ProductionSuggestionItemDTO> result = new ArrayList<>();
        BigDecimal grandTotal = BigDecimal.ZERO;

        for (Product product : products) {

            if (product.materials == null || product.materials.isEmpty()) {
                continue;
            }

            int maxProduction = Integer.MAX_VALUE;

            for (ProductMaterial pm : product.materials) {

                int stock = virtualStock.getOrDefault(
                        pm.rawMaterial.id,
                        0
                );

                int possible = stock / pm.quantity;

                maxProduction = Math.min(maxProduction, possible);
            }

            if (maxProduction <= 0 || maxProduction == Integer.MAX_VALUE) {
                continue;
            }

            for (ProductMaterial pm : product.materials) {

                Long materialId = pm.rawMaterial.id;

                int currentStock = virtualStock.get(materialId);

                virtualStock.put(
                        materialId,
                        currentStock - (pm.quantity * maxProduction)
                );
            }

            BigDecimal total =
                    product.price.multiply(BigDecimal.valueOf(maxProduction));

            grandTotal = grandTotal.add(total);

            result.add(
                    new ProductionSuggestionItemDTO(
                            product.code,
                            product.name,
                            maxProduction,
                            total
                    )
            );
        }

        return new ProductionSuggestionDTO(result, grandTotal);
    }
}
