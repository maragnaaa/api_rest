import { AppError } from "../errors/appError.js"

function notFound(req, res, next) {
    next(new AppError(`Route ${req.method} ${req.originalUrl} not found`, 404));
}

export default notFound;