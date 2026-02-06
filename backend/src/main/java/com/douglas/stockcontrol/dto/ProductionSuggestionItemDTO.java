package com.douglas.stockcontrol.dto;

import java.math.BigDecimal;

public class ProductionSuggestionItemDTO {

    public String productCode;
    public String productName;
    public Integer quantityPossible;
    public BigDecimal totalValue;

    public ProductionSuggestionItemDTO(String productCode,
                                       String productName,
                                       Integer quantityPossible,
                                       BigDecimal totalValue) {
        this.productCode = productCode;
        this.productName = productName;
        this.quantityPossible = quantityPossible;
        this.totalValue = totalValue;
    }
}
