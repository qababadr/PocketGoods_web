export function stringAvatar() {}

export function makeInvocable<T extends { invoke: (...args: any[]) => any }>(
    instance: T
): T["invoke"] & T {
    const callback = instance.invoke.bind(instance) as T["invoke"] & T;

    Object.setPrototypeOf(callback, Object.getPrototypeOf(instance));

    Object.assign(callback, instance);
    return callback;
}
