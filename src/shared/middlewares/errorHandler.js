import { env } from "../../config/env.js"

function errorHandler(err, req, res, next) {
    console.error(err);

    const statusCode = err.statusCode || 500;
    const message = err.message && env.NODE_ENV === "production"
        ? "Internal server error"
        : err.message;

    return res.status(statusCode).json({ error: message });
}

export default errorHandler;