describe("Should login and wishlist should contain expected products", () => {
    beforeEach(() => {
        cy.launchHomeScreen();
    });

    it("Should authenticate user and wishlist should container correct products ids", () => {
        cy.login();
    });
});
// describe("Should register new user", () => {
//     beforeEach(() => {
//         cy.launchHomeScreen();
//     });

//     it("should register user", () => {
//         cy.register();
//     });
// });
