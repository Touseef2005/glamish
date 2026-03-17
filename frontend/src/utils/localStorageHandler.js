// utils/localStorageHandler.js
'use client';

const localStorageHandler = {
    set: (key, value) => {
        if (typeof window !== "undefined") {
            localStorage.setItem(key, JSON.stringify(value));
        }
    },
    get: (key) => {
        if (typeof window !== "undefined") {
            return JSON.parse(localStorage.getItem(key)) || null;
        }
        return null;
    },
    remove: (key) => {
        if (typeof window !== "undefined") {
            localStorage.removeItem(key);
        }
    }
};

export default localStorageHandler;
