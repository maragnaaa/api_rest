function errorHandler(err, req, res, next) {
    console.error(err);

    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    return res.status(statusCode).json({ error: message });
}

export default errorHandler;