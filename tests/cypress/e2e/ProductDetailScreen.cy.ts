describe("Should navigate to product detail screen and assert has correct product details", () => {
    beforeEach(() => {
        cy.launchProductDetailScreen();
    });

    it("should show skeleton loader while product detail is loading", () => {
        cy.assertLoadingIndicatorIsVisible();
    });

    it("Should display correct product details", () => {
        cy.wait("@getProductDetail");

        cy.fixture("sunglassesProductDetail.json").then((response: any) => {
            cy.assertHasCorrectProductDetails(response.data);
        });
    });
});
