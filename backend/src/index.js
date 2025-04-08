import express from 'express';
import { createServer } from 'http';
import loaders from './loaders/middlewareLoaders.js';
import routes from './routes/index.js';
import errorHandler from './middlewares/error.js';

function main () {
    const app = express();
    const server = createServer(app);
    const port = process.env.PORT;

    loaders(app, server);
    
    routes(app);

    errorHandler(app);
    
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}

main();


