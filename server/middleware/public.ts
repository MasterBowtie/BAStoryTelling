import { Middleware } from "./middleware";

export const publicMiddleware: Middleware = async (req, res, next) => {
    console.log("Public Middleware");

    next();
}