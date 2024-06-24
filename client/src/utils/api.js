import { createContext } from "react";

export class Api {
    authToken = null;

    constructor(initialToken) {
        this.authToken = initialToken
    }

    /**
   * Makes an HTTP request.
   * @param {string} url - The url to request.
   * @param {"GET" | "POST" | "PUT" | "DELETE"} method - The HTTP method to use.
   * @param {Object} [body] - The request body for POST and PUT requests.
   * @returns {Promise<any>} The response from the request.
   */
    async makeRequest(url, method, body) {
        const options = {};
        if (method === "POST" || method === "PUT") {
            options.body = JSON.stringify(body);
        }

        const res = await fetch(url, {
            method, 
            headers: {
                Authorization: `Bearer ${this.authToken}`,
                'Content-Type': 'application/json',
            },
            ...options,
        });

        if (!res.ok) {
            const errorBody = await res.json();
            throw new Error(errorBody.message || `HTTP error! status ${res.status}`);
        }

        const text = await res.text();
        return text ? JSON.parse(text) : {};
    }

    get(url) {
        return this.makeRequest(url, 'GET')
    }

    post(url, body) {
        return this.makeRequest(url, "POST", body)
    }

    put(url, body) {
        return this.makeRequest(url, "PUT", body)
    }

    del(url) {
        return this.makeRequest(url, "DELETE")
    }
}

export const ApiContext = createContext(new Api());