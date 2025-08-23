export function stringAvatar(name: string): string {
    return `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`;
}

export function makeInvocable<T extends { invoke: (...args: any[]) => any }>(
    instance: T
): T["invoke"] & T {
    const callback = instance.invoke.bind(instance) as T["invoke"] & T;

    Object.setPrototypeOf(callback, Object.getPrototypeOf(instance));

    Object.assign(callback, instance);
    return callback;
}

export function testAttr(name: string): Record<string, string> {
    return import.meta.env.MODE !== "production" ? { "data-test": name } : {};
}
