import { useAuthStore } from "@src/AuthenticationFeature/Auth/AuthStore";
import { Constants } from "@src/CoreUI/Util/constants";
import Layout from "../Layout.vue";
import HomeScreen from "../HomeScreen.vue";

const ProductDetailScreen = () =>
    import("@src/ProductFeature/Presentation/Screen/ProductDetailScreen.vue");

const WishlistManagerScreen = () =>
    import(
        "@src/WishlistFeature/Presentation/Screen/WishlistManagerScreen.vue"
    );

const ProductSearchResultScreen = () =>
    import(
        "@src/ProductFeature/Presentation/Screen/ProductSearchResultScreen.vue"
    );

const Page401 = () => import("@src/CoreUI/Components/401.vue");

const Page404 = () => import("@src/CoreUI/Components/404.vue");

export const routes = [
    {
        path: "/",
        component: Layout,
        Children: [
            {
                name: Constants.SCREENS.HomeScreen,
                path: "/",
                component: HomeScreen,
                meta: {
                    middleware: Constants.Middleware.GUEST,
                    title: Constants.APP_NAME,
                    enterTransition: "animate__fadeIn",
                    leaveTransition: "animate__fadeOutLeft animate__faster",
                },
            },
            {
                name: Constants.SCREENS.ProductDetailScreen,
                path: "/product/:id",
                component: ProductDetailScreen,
                meta: {
                    middleware: Constants.Middleware.GUEST,
                    title: "Product",
                    enterTransition: "animate__fadeInRight animate__faster",
                    leaveTransition: "animate__fadeOut",
                },
            },
            {
                name: Constants.SCREENS.WishlistManagerScreen,
                path: "/wishlist",
                component: WishlistManagerScreen,
                meta: {
                    middleware: Constants.Middleware.AUTH,
                    title: "My wishlist",
                    enterTransition: "animate__bounceInRight animate__faster",
                    leaveTransition: "animate__fadeOut",
                },
                beforeEnter: (_to: any, _from: any) => {
                    const auth = useAuthStore();
                    return auth.isAuthenticated;
                },
            },
            {
                name: Constants.SCREENS.ProductSearchResultScreen,
                path: "/search",
                component: ProductSearchResultScreen,
                meta: {
                    middleware: Constants.Middleware.GUEST,
                    title: "Search",
                    enterTransition: "animate__bounceInRight animate__faster",
                    leaveTransition: "animate__fadeOut",
                },
            },
            {
                name: Constants.SCREENS.Page401,
                path: "/401",
                component: Page401,
                meta: {
                    middleware: Constants.Middleware.GUEST,
                    title: "401 | Unauthorized",
                    enterTransition: "animate__fadeIn",
                    leaveTransition: "animate__fadeOut",
                },
            },
            {
                name: Constants.SCREENS.Page404,
                path: "/404",
                component: Page404,
                meta: {
                    middleware: Constants.Middleware.GUEST,
                    title: "404 | Not found",
                    enterTransition: "animate__fadeIn",
                    leaveTransition: "animate__fadeOut",
                },
            },
            {
                name: Constants.SCREENS.Page404,
                path: "/:pathMatch(.*)*",
                component: Page404,
                meta: {
                    middleware: Constants.Middleware.GUEST,
                    title: "404 | Page Not found",
                    enterTransition: "animate__fadeIn",
                    leaveTransition: "animate__fadeOut",
                },
            },
        ],
    },
];
