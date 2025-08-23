//php artisan serve --host=0.0.0.0 --port=8000
export const Constants = {
    // Base_URL: "http://127.0.0.1:8000/api/",
    Base_URL: "http://127.0.0.1:8000/api/",
    // HOST: "http://127.0.0.1:8000",
    HOST: "http://192.168.1.6:8000",
    REGEX: {
        EMAIL: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,

        PASSWORD: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
    },
    AUTH_STORAGE_KEY: "auth_storage_key",
};
