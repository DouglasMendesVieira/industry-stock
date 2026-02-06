package com.douglas.stockcontrol.controller;

import com.douglas.stockcontrol.dto.ProductionSuggestionDTO;
import com.douglas.stockcontrol.service.ProductionSuggestionService;
import jakarta.inject.Inject;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;

@Path("/production-suggestion")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class ProductionSuggestionController {

    @Inject
    ProductionSuggestionService service;

    @GET
    public ProductionSuggestionDTO calculate() {
        return service.calculate();
    }
}
