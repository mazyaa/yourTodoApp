import { HttpError } from '../utils/error.js';

// handling global error
export default (app) => {
    app.use(notFound);
    app.use(errorHandler);
};

// function to handle not found route
function notFound(req, _res, next) {
    const notFoundError = new HttpError(
        `Route not found - ${req.originalUrl}`,
        404
    );
    next(notFoundError);
}

// use for hndling error so that we can send error response to client
function errorHandler(err, _req, res, _next) {
    if (err instanceof HttpError) {
        res.status(err.statusCode).json({
            message: err.message
        });
        return;
    }

    if (err instanceof Error) {
        res.status(500).json({ message: err.message });
        return;
    }

    res.status(500).json({ message: 'internal server error' }); 
}