describe("Create Product", () => {

  it("should create a product", () => {

    cy.intercept("POST", "**/products", {
      statusCode: 201,
      body: {
        id: 1,
        name: "Notebook",
        stock: 10
      }
    }).as("createProduct");

    cy.visit("/products");

    cy.get('input[name="name"]').type("Notebook");
    cy.get('input[name="stock"]').type("10");

    cy.findByRole("button", { name: /create/i }).click();

    cy.wait("@createProduct");

    cy.contains("Product created!").should("be.visible");

  });

});
