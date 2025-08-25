import { Image, Product, ProductPreview } from "@src/Core";

Cypress.Commands.add(
    "assertHasCorrectProductsCount",
    (products: ProductPreview[]) => {
        cy.get(".product-card").should("have.length", products.length);
    }
);

Cypress.Commands.add(
    "assertProductHasCorrectData",
    (index: number, product: ProductPreview) => {
        cy.get(".product-card")
            .eq(index)
            .scrollIntoView()
            .within(() => {
                cy.contains(product.title);
                cy.contains(product.price);
                cy.get("img.v-img__img", { timeout: 10000 })
                    .should("be.visible")
                    .should("have.attr", "src")
                    .and("eq", product.thumbnail);
            });
    }
);

Cypress.Commands.add("assertLoadingIndicatorIsVisible", () => {
    cy.get(".v-skeleton-loader").should("be.visible");
});

Cypress.Commands.add("assertHasCorrectProductDetails", (product: Product) => {
    cy.contains(".text-subtitle-1", product.title).should("exist");
    cy.contains(".text-subtitle-2", `${product.price}$`).should("exist");
    cy.contains(".text-subtitle-2", product.description).should("exist");

    if (product.inStock) {
        cy.contains(".text-caption", `${product.quantity}`).should("exist");
    }

    cy.contains(".text-subtitle-2", product.category).should("exist");

    product.media.forEach((image: Image, index: number) => {
        cy.get(`.v-carousel-item img[src="${image.original}"]`)
            .scrollIntoView()
            .should("exist");

        if (index < product.media.length - 1) {
            cy.get(".mdi-menu-right").click();

            cy.wait(500);
        }
    });
});
