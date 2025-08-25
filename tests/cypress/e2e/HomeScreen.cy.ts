import { ProductPreview } from "@src/Core";

describe("Loading products", () => {
    beforeEach(() => {
        cy.launchHomeScreen();
    });

    it("should show skeleton loader while products is loading", () => {
        cy.assertLoadingIndicatorIsVisible();
    });

    it("should display correct product data in cards", () => {
        cy.wait("@getProducts");

        cy.fixture("products.json").then((response: any) => {
            const products = response.data;

            cy.assertHasCorrectProductsCount(products);

            products.forEach((product: ProductPreview, index: number) => {
                cy.assertProductHasCorrectData(index, product);
            });
        });
    });
});

describe("Should navigate to product detail screen", () => {
    beforeEach(() => {
        cy.launchHomeScreen();
    });

    it("Should click on learn more button to navigate to product detail screen", () => {
        cy.wait("@getProducts");

        cy.navigateToProductDetails(0);

        cy.url().should("include", "/product/1");
    });

    it("Can navigate to home screen", () => {
        cy.launchHomeScreen();
    });
});

describe("Should add and remove a product from wishlist after authentication", () => {
    beforeEach(() => {
        cy.launchHomeScreen();
    });

    it("Authenticate and assert is authenticated and user can toggle wishlist", () => {
        cy.login();

        cy.wait(600);

        cy.assertCanToggleWishlist(1, 2);
    });
});
