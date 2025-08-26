describe("Should login user", () => {
    beforeEach(() => {
        cy.launchHomeScreen();
    });

    it("Authenticate user and assert user menu is visible", () => {
        cy.sendLoginRequest("backupbadr@email.com", "Password@1");
        cy.assertCanLoginWithCorrectCredentials();
    });
});

describe("Should not login user", () => {
    beforeEach(() => {
        cy.launchHomeScreen();
    });

    it("Should display alert message after providing wrong credentials", () => {
        cy.sendLoginRequest("some_random_email@email.com", "some wrong@1");
        cy.assertCannotLoginWithInCorrectCredentials();
    });
});

describe("Should register new user", () => {
    beforeEach(() => {
        cy.launchHomeScreen();
    });

    it("Should display success message after registering", () => {
        const fullname = "some user";

        cy.sendRegisterRequest(
            fullname,
            "someuser@email.com",
            "Password@1",
            "Password@1"
        );

        cy.assertCanRegister(fullname);
    });
});

describe("Should not register existing user", () => {
    beforeEach(() => {
        cy.launchHomeScreen();
    });

    it("Should display error message after failed to register", () => {
        cy.sendRegisterRequest(
            "some registered user",
            "backupbadr@email.com",
            "Password@1",
            "Password@1"
        );

        cy.assertCannotRegisterWhenEmailExist();
    });
});
