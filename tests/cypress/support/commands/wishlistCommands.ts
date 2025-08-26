import { Interception } from "node_modules/cypress/types/net-stubbing";

const apiURL = Cypress.env("apiURL");

let addedToWishlistFixture: any;
let removedFromWishlistFixture: any;

beforeEach(() => {
    cy.fixture("added_to_wishlist_response.json").then((data: any) => {
        addedToWishlistFixture = data;
    });

    cy.fixture("removed_from_wishlist_response.json").then((data: any) => {
        removedFromWishlistFixture = data;
    });
});

Cypress.Commands.add(
    "sendToggleWishlistRequest",
    (productId: number, shouldAdd: boolean) => {
        cy.intercept(
            "GET",
            `${apiURL}/wishlist/toggle/${productId}`,
            (request) => {
                if (shouldAdd) {
                    request.reply({
                        statusCode: 200,
                        body: addedToWishlistFixture,
                    });
                } else {
                    request.reply({
                        statusCode: 200,
                        body: removedFromWishlistFixture,
                    });
                }
            }
        ).as("toggleWishlistRequest");
    }
);

Cypress.Commands.add(
    "clickAndAssertProductIsAddedToWishlist",
    (productIndex: number, productId) => {
        cy.get(".product-card")
            .eq(productIndex)
            .scrollIntoView()
            .trigger("mouseenter")
            .find(".product-menu-action.visible-menu")
            .should("be.visible")
            .find("button")
            .click();

        cy.wait("@toggleWishlistRequest").then((response: Interception) => {
            expect(response.response?.statusCode).to.eq(200);

            const stored = localStorage.getItem("auth_storage_key");
            expect(stored, "The user data must be cached").to.not.be.null;

            if (stored) {
                try {
                    const parsed = JSON.parse(stored);
                    const authenticatedUser = parsed.authenticatedUser;

                    expect(
                        authenticatedUser.wishlist,
                        "The wishlist should not be an array"
                    ).to.be.an("array");

                    const isInWishlist = authenticatedUser.wishlist.some(
                        (item: any) => item.productId === productId
                    );

                    expect(isInWishlist, "Product must be in wishlist").to.be
                        .true;

                    cy.get(".product-card")
                        .eq(productIndex)
                        .find("button")
                        .find("i")
                        .should("have.class", "mdi-heart");
                } catch (error) {
                    throw new Error(`Error occurred: ${error}`);
                }
            }
        });
    }
);

Cypress.Commands.add(
    "clickAndAssertProductIsRemovedFromWishlist",
    (productIndex: number, productId: number) => {
        cy.get(".product-card")
            .eq(productIndex)
            .scrollIntoView()
            .trigger("mouseleave")
            .trigger("mouseenter")
            .find(".product-menu-action.visible-menu")
            .should("be.visible")
            .find("button")
            .click();

        cy.wait("@toggleWishlistRequest").then((response: Interception) => {
            expect(response.response?.statusCode).to.eq(200);

            const stored = localStorage.getItem("auth_storage_key");
            expect(stored, "The user must be cached").to.not.be.null;

            if (stored) {
                try {
                    const parsed = JSON.parse(stored);
                    const authenticatedUser = parsed.authenticatedUser;

                    const isInWishlist = authenticatedUser.wishlist.some(
                        (item: any) => item.productId === productId
                    );

                    expect(
                        isInWishlist,
                        "Product must be removed from wishlist"
                    ).to.be.false;

                    cy.get(".product-card")
                        .eq(productIndex)
                        .find("button")
                        .find("i")
                        .should("have.class", "mdi-heart-outline");
                } catch (error) {
                    throw new Error(`Error occurred: ${error}`);
                }
            }
        });
    }
);
