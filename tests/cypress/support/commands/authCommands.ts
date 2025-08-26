import { Interception } from "node_modules/cypress/types/net-stubbing";
const apiURL = Cypress.env("apiURL");

let userFixture: any;
let loginErrorFixture: any;
let registeredFixture: any;
let registerErrorFixture: any;

beforeEach(() => {
    cy.fixture("user.json").then((data: any) => {
        userFixture = data;
    });

    cy.fixture("login_error.json").then((data: any) => {
        loginErrorFixture = data;
    });

    cy.fixture("registered_response.json").then((data: any) => {
        registeredFixture = data;
    });

    cy.fixture("register_error.json").then((data: any) => {
        registerErrorFixture = data;
    });
});

Cypress.Commands.add("sendLoginRequest", (email: string, password: string) => {
    cy.get("[data-test=login-modal-button]").click();

    cy.wait(500);

    cy.intercept("POST", `${apiURL}/login`, (request) => {
        if (hasCorrectCredentials(email, password)) {
            request.reply({
                statusCode: 200,
                body: userFixture,
            });
        } else {
            request.reply({
                statusCode: 401,
                body: loginErrorFixture,
            });
        }
    }).as("loginRequest");

    cy.get("[data-test=email-field]").type(email);
    cy.get("[data-test=password-field]").type(password);
    cy.get("[data-test=login-button]").click();
});

Cypress.Commands.add("assertCanLoginWithCorrectCredentials", () => {
    cy.wait("@loginRequest").then((loginIntercept: Interception) => {
        expect(loginIntercept.response?.statusCode).to.eq(200);

        cy.get("[data-test=user-menu]").should("be.visible");
    });
});

Cypress.Commands.add("assertCannotLoginWithInCorrectCredentials", () => {
    cy.wait("@loginRequest").then((loginIntercept: Interception) => {
        expect(loginIntercept.response?.statusCode).to.eq(401);

        cy.get(".v-alert__content")
            .should("be.visible")
            .and(
                "contain.text",
                "No such user found with the given credentials. Please try again"
            );
    });
});

Cypress.Commands.add(
    "sendRegisterRequest",
    (
        fullname: string,
        email: string,
        password: string,
        passwordConfirmation: string
    ) => {
        cy.get("[data-test=login-modal-button]").click();

        cy.wait(500);

        cy.intercept("PUT", `${apiURL}/register`, (request) => {
            if (emailExist(email)) {
                request.reply({
                    statusCode: 500,
                    body: registerErrorFixture,
                });
            } else {
                request.reply({
                    statusCode: 201,
                    body: registeredFixture,
                });
            }
        }).as("registerRequest");

        cy.get("[data-test=toggle-form-btn]").click();

        cy.get("[data-test=fullname-field]").type(fullname);
        cy.get("[data-test=email-field]").type(email);
        cy.get("[data-test=password-field]").type(password);
        cy.get("[data-test=confirm-password-field]").type(passwordConfirmation);
        cy.get("[data-test=register-btn]").click();
    }
);

Cypress.Commands.add("assertCanRegister", (fullname: string) => {
    cy.wait("@registerRequest").then((registerInterception: Interception) => {
        expect(registerInterception.response?.statusCode).to.eq(201);

        cy.wait(400);

        cy.get(".v-alert__content")
            .should("be.visible")
            .and("contain.text", `We are glad to have you with us ${fullname}`);
    });
});

Cypress.Commands.add("assertCannotRegisterWhenEmailExist", () => {
    cy.wait("@registerRequest").then((registerInterception: Interception) => {
        expect(registerInterception.response?.statusCode).to.eq(500);

        cy.wait(400);

        cy.get(".v-alert__content")
            .should("be.visible")
            .and(
                "contain.text",
                "Ops...! an error occurred while registering please try again"
            );
    });
});

function hasCorrectCredentials(email: string, password: string): boolean {
    return email === "backupbadr@email.com" && password === "Password@1";
}

function emailExist(email: string): boolean {
    return email === "backupbadr@email.com";
}
