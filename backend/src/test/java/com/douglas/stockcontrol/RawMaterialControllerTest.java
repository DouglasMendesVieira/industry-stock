package com.douglas.stockcontrol;

import io.quarkus.test.junit.QuarkusTest;
import io.restassured.http.ContentType;
import org.junit.jupiter.api.Test;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.*;

@QuarkusTest
public class RawMaterialControllerTest {

    @Test
    public void shouldCreateRawMaterial(){

        given()
                .contentType(ContentType.JSON)
                .body("""
                {
                    "name":"Steel",
                    "stockQuantity":100
                }
            """)
                .when()
                .post("/raw-materials")
                .then()
                .statusCode(201)
                .body("id", notNullValue())
                .body("name", equalTo("Steel"))
                .body("stockQuantity", equalTo(100));
    }
}
