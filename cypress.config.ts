import { defineConfig } from "cypress";

export default defineConfig({
    chromeWebSecurity: false,
    env: {
        apiURL: "/api",
    },
    e2e: {
        setupNodeEvents() {},
        baseUrl: "http://192.168.1.6:8000",
        supportFile: "tests/cypress/support/e2e.ts",
        specPattern: "tests/cypress/e2e/*.cy.ts",
        fixturesFolder: "tests/cypress/fixtures",
        video: false,
    },
});
