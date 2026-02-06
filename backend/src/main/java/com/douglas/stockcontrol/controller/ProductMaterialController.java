package com.douglas.stockcontrol.controller;

import com.douglas.stockcontrol.domain.ProductMaterial;
import com.douglas.stockcontrol.dto.AddMaterialToProductDTO;
import com.douglas.stockcontrol.service.ProductMaterialService;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.util.List;

@Path("/products/{productId}/materials")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class ProductMaterialController {

    private final ProductMaterialService service;

    public ProductMaterialController(ProductMaterialService service) {
        this.service = service;
    }

    @POST
    public Response addMaterial(@PathParam("productId") Long productId,
                                AddMaterialToProductDTO dto) {

        ProductMaterial created = service.addMaterial(productId, dto);

        return Response.status(Response.Status.CREATED)
                .entity(created)
                .build();
    }

    @GET
    public List<ProductMaterial> list(@PathParam("productId") Long productId) {
        return service.listByProduct(productId);
    }

    @DELETE
    @Path("/{id}")
    public Response delete(@PathParam("id") Long id) {

        service.delete(id);

        return Response.noContent().build();
    }
}
