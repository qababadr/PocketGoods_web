import { Interception } from "node_modules/cypress/types/net-stubbing";

const apiURL = Cypress.env("apiURL");

Cypress.Commands.add(
    "assertCanToggleWishlist",
    (productIndex: number, productId: number) => {
        cy.intercept("GET", `${apiURL}/wishlist/toggle/${productId}`).as(
            "toggleWishlist"
        );

        cy.get(".product-card")
            .eq(productIndex)
            .scrollIntoView()
            .trigger("mouseenter")
            .find(".product-menu-action.visible-menu")
            .should("be.visible")
            .find("button")
            .click();

        cy.wait("@toggleWishlist").then((response: Interception) => {
            expect(response?.response?.statusCode).to.eq(200);

            const stored = localStorage.getItem("auth_storage_key");
            expect(stored, "The user data must be cached").to.not.be.null;

            if (stored) {
                try {
                    const parsed = JSON.parse(stored);
                    const authenticatedUser = parsed.authenticatedUser;

                    expect(
                        authenticatedUser.wishlist,
                        "The wishlist should be an array"
                    ).to.be.an("array");

                    const inWishlist = authenticatedUser.wishlist.some(
                        (item: any) => item.productId === productId
                    );

                    expect(inWishlist, "Product must be in wishlist").to.be
                        .true;

                    cy.get(".product-card")
                        .eq(productIndex)
                        .find("button")
                        .find("i")
                        .should("have.class", "mdi-heart");
                } catch (error) {
                    throw new Error(
                        `Failed to parse user from localstorage: ${error}`
                    );
                }
            }
        });

        cy.wait(1000);

        cy.get(".product-card")
            .eq(productIndex)
            .scrollIntoView()
            .trigger("mouseenter")
            .find(".product-menu-action.visible-menu")
            .should("be.visible")
            .find("button")
            .click();

        cy.wait("@toggleWishlist").then((response: Interception) => {
            expect(response?.response?.statusCode).to.eq(200);

            const stored = localStorage.getItem("auth_storage_key");
            expect(stored, "The user data must be cached").to.not.be.null;

            if (stored) {
                try {
                    const parsed = JSON.parse(stored);
                    const authenticatedUser = parsed.authenticatedUser;

                    expect(
                        authenticatedUser.wishlist,
                        "The wishlist should be an array"
                    ).to.be.an("array");

                    const inWishlist = authenticatedUser.wishlist.some(
                        (item: any) => item.productId === productId
                    );

                    expect(inWishlist, "Product must not be in wishlist").to.be
                        .false;

                    cy.get(".product-card")
                        .eq(productIndex)
                        .find("button")
                        .find("i")
                        .should("have.class", "mdi-heart-outline");
                } catch (error) {
                    throw new Error(
                        `Failed to parse user from localstorage: ${error}`
                    );
                }
            }
        });
    }
);
