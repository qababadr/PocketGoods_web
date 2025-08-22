import "reflect-metadata";
import { Container } from "inversify";

let container = new Container();

type FeatureModuleRegistrar = (container: Container) => void;

const modules = import.meta.glob("@src/*Feature/Data/DI/*FeatureModule.ts", {
    eager: true,
});

for (const mod of Object.values(modules)) {
    const moduleExports = mod as Record<string, unknown>;
    for (const [exportName, exported] of Object.entries(moduleExports)) {
        if (
            typeof exported === "function" &&
            /^register.*FeatureModule$/.test(exportName)
        ) {
            (exported as FeatureModuleRegistrar)(container);
        }
    }
}

export { container };
