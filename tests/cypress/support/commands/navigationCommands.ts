const apiURL = Cypress.env("apiURL");

Cypress.Commands.add("launchHomeScreen", () => {
    cy.intercept("GET", `${apiURL}/products*`, { fixture: "products.json" }).as(
        "getProducts"
    );
    cy.visit("/");
});

Cypress.Commands.add("launchProductDetailScreen", () => {
    cy.intercept("GET", `${apiURL}/product/details/1`, {
        fixture: "sunglassesProductDetail.json",
    }).as("getProductDetail");
    cy.visit("/product/1");
});

Cypress.Commands.add("navigateToProductDetails", (index: number) => {
    cy.get(".product-card").eq(index).find(".toggle-show").click();
});
