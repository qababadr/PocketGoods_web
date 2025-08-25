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

            login(): Chainable<void>;

            register(): Chainable<void>;

            assertUserHasCorrectWishlist(): Chainable<void>;

            assertCanToggleWishlist(
                productIndex: number,
                productId: number
            ): Chainable<void>;
        }
    }
}
export {};
