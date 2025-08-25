import { User } from "@src/Core";
import { Interception } from "node_modules/cypress/types/net-stubbing";
const apiURL = Cypress.env("apiURL");

Cypress.Commands.add("login", () => {
    cy.get("[data-test=login-modal-button]").click();

    cy.wait(500);

    cy.intercept("POST", `${apiURL}/login`).as("loginRequest");

    cy.get("[data-test=email-field]").type("backupbadr@email.com");
    cy.get("[data-test=password-field]").type("Password@1");
    cy.get("[data-test=login-button]").click();

    cy.wait("@loginRequest").then((loginIntercept: Interception) => {
        expect(loginIntercept.response?.statusCode).to.eq(200);

        cy.fixture("user.json").then((response: any) => {
            const user: User = response.data.user;

            const actualUser = loginIntercept.response?.body.data.user;

            expect(actualUser.id, "Expecting correct user id").to.eq(user.id);
            expect(actualUser.name, "Expecting correct user id").to.eq(
                user.name
            );
            expect(actualUser.email, "Expecting correct user id").to.eq(
                user.email
            );

            const actualStoredValue = localStorage.getItem("auth_storage_key");

            expect(actualStoredValue).to.not.be.null;

            const parsedData = JSON.parse(actualStoredValue!);

            expect(parsedData.theme).to.be.oneOf(["darkTheme", "lightTheme"]);
        });
    });
});

Cypress.Commands.add("register", () => {
    cy.get("[data-test=login-modal-button]").click();

    cy.wait(500);

    cy.intercept("PUT", `${apiURL}/register`).as("registerRequest");

    cy.get("[data-test=toggle-form-btn]").click();

    cy.wait(500);

    cy.get("[data-test=fullname-field]").type("badr qaba");
    cy.get("[data-test=email-field]").type("backupbadr@email.com");
    cy.get("[data-test=password-field]").type("Password@1");
    cy.get("[data-test=confirm-password-field]").type("Password@1");
    cy.get("[data-test=register-btn]").click();

    cy.wait("@registerRequest").then((registerIntercept: Interception) => {
        expect(registerIntercept.response?.statusCode).to.eq(201);

        cy.wait(400);

        cy.get(".v-alert__content")
            .should("be.visible")
            .and("contain.text", "We are glad to have you with us badr qaba");
    });
});
