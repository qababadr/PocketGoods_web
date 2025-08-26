import { Product, ProductPreview } from "@src/Core";
import "./commands/navigationCommands";
import "./commands/productCommands";
import "./commands/authCommands";
import "./commands/wishlistCommands";

declare global {
    namespace Cypress {
        interface Chainable {
            assertHasCorrectProductsCount(
                products: ProductPreview[]
            ): Chainable<void>;

            launchHomeScreen(): Chainable<void>;

            assertProductHasCorrectData(
                index: number,
                product: ProductPreview
            ): Chainable<void>;

            assertLoadingIndicatorIsVisible(): Chainable<void>;

            launchProductDetailScreen(): Chainable<void>;

            assertHasCorrectProductDetails(product: Product): Chainable<void>;

            navigateToProductDetails(index: number): Chainable<void>;

            sendLoginRequest(email: string, password: string): Chainable<void>;

            assertCanLoginWithCorrectCredentials(): Chainable<void>;

            assertCannotLoginWithInCorrectCredentials(): Chainable<void>;

            sendRegisterRequest(
                fullname: string,
                email: string,
                password: string,
                passwordConfirmation: string
            ): Chainable<void>;

            assertCanRegister(fullname: string): Chainable<void>;

            assertCannotRegisterWhenEmailExist(): Chainable<void>;

            sendToggleWishlistRequest(
                productId: number,
                shouldAdd: boolean
            ): Chainable<void>;

            clickAndAssertProductIsAddedToWishlist(
                productIndex: number,
                productId: number
            ): Chainable<void>;

            clickAndAssertProductIsRemovedFromWishlist(
                productIndex: number,
                productId: number
            ): Chainable<void>;
        }
    }
}
export {};
