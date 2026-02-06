package com.douglas.stockcontrol.dto;

import java.math.BigDecimal;
import java.util.List;

public class ProductionSuggestionDTO {

    public List<ProductionSuggestionItemDTO> items;
    public BigDecimal grandTotal;

    public ProductionSuggestionDTO(List<ProductionSuggestionItemDTO> items,
                                   BigDecimal grandTotal) {
        this.items = items;
        this.grandTotal = grandTotal;
    }
}
