import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';

export default function loadMiddlewares (app) {
    app.use(cors({
        origin: process.env.FRONTEND_URL,
        credentials: true // fot getting cookies from the client (user)
    })); // enable cors

    app.use(express.json()); // parsing application/json

    app.use(express.urlencoded({ extended: true })); // parsing application/x-www-form-urlencoded (recognize req.body)
    
    app.use(morgan('combined')); // logging

    app.use(cookieParser()); // parsing cookies
}