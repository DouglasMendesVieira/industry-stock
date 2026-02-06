package com.douglas.stockcontrol;

import com.douglas.stockcontrol.domain.RawMaterial;
import com.douglas.stockcontrol.service.RawMaterialService;
import io.quarkus.test.junit.QuarkusTest;
import jakarta.inject.Inject;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.wildfly.common.Assert.assertNotNull;

@QuarkusTest
public class RawMaterialServiceTest {

    @Inject
    RawMaterialService service;

    @Test
    public void shouldPersistMaterial(){

        RawMaterial material = new RawMaterial();
        material.name = "Iron";
        material.stockQuantity = 50;

        RawMaterial saved = service.create(material);

        assertNotNull(saved.id);
        assertEquals("Iron", saved.name);
    }
}
