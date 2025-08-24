import {
    createRouter,
    createWebHistory,
    NavigationGuardNext,
    RouteLocationNormalized,
} from "vue-router";
import { routes } from "./routes";
import { useAuthStore } from "@src/AuthenticationFeature/Auth/AuthStore";
import { useLoaderStore } from "@src/CoreUI/Components";
import { Constants } from "@src/CoreUI/Util/constants";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: routes,
    scrollBehavior(to, _from, savedPosition) {
        if (to.hash) {
            return { el: to.hash, behavior: "smooth" };
        }
        if (savedPosition) return savedPosition;

        return { top: 0, behavior: "smooth" };
    },
});

router.beforeEach(
    async (
        to: RouteLocationNormalized,
        _from: RouteLocationNormalized,
        next: NavigationGuardNext
    ) => {
        const auth = useAuthStore();
        const loader = useLoaderStore();

        document.title = to.meta.title as string;

        if (to.name) {
            loader.setIsLoading(true);
        }

        await auth.check();

        if (auth.isAuthenticated) {
            next();
        } else {
            auth.clear();
            if (to.meta.middleware === Constants.Middleware.AUTH) {
                next({ name: Constants.SCREENS.Page401 });
            } else {
                next();
            }
        }
    }
);

router.afterEach(
    (_to: RouteLocationNormalized, _from: RouteLocationNormalized) => {
        const loader = useLoaderStore();
        loader.setIsLoading(false);
    }
);

export default router;
