package com.douglas.stockcontrol.controller;

import com.douglas.stockcontrol.domain.RawMaterial;
import com.douglas.stockcontrol.service.RawMaterialService;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.util.List;

@ApplicationScoped
@Path("/raw-materials")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class RawMaterialController {

    private final RawMaterialService service;

    public RawMaterialController(RawMaterialService service) {
        this.service = service;
    }

    @GET
    public List<RawMaterial> list() {
        return service.listAll();
    }

    @GET
    @Path("/{id}")
    public RawMaterial find(@PathParam("id") Long id) {

        RawMaterial material = service.findById(id);

        if (material == null) {
            throw new NotFoundException("Raw material not found");
        }

        return material;
    }

    @POST
    public Response create(RawMaterial material) {

        RawMaterial created = service.create(material);

        return Response
                .status(Response.Status.CREATED)
                .entity(created)
                .build();
    }

    @PUT
    @Path("/{id}")
    public RawMaterial update(@PathParam("id") Long id, RawMaterial material) {
        return service.update(id, material);
    }

    @DELETE
    @Path("/{id}")
    public Response delete(@PathParam("id") Long id) {

        service.delete(id);

        return Response.noContent().build();
    }
}
