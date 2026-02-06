package com.douglas.stockcontrol.controller;

import com.douglas.stockcontrol.domain.Product;
import com.douglas.stockcontrol.service.ProductService;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.util.List;

@Path("/products")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class ProductController {

    private final ProductService service;

    public ProductController(ProductService service) {
        this.service = service;
    }

    @GET
    public List<Product> list() {
        return service.listAll();
    }

    @GET
    @Path("/{id}")
    public Product find(@PathParam("id") Long id) {

        Product product = service.findById(id);

        if (product == null) {
            throw new NotFoundException("Product not found");
        }

        return product;
    }

    @POST
    public Response create(Product product) {

        Product created = service.create(product);

        return Response
                .status(Response.Status.CREATED)
                .entity(created)
                .build();
    }

    @PUT
    @Path("/{id}")
    public Product update(@PathParam("id") Long id, Product product) {
        return service.update(id, product);
    }

    @DELETE
    @Path("/{id}")
    public Response delete(@PathParam("id") Long id) {

        service.delete(id);

        return Response.noContent().build();
    }
}
