// import bodyParser from 'body-parser'
// import cookieParser from 'cookie-parser'; // Deprecated
// import cors from 'cors';
import express from 'express';
import path from 'path';
import logger from 'morgan';
import {error404, errorHandler,} from './handlers/error';

import db, {connect} from './helpers/mongo';
import debug from './helpers/debug';

import locationRoutes from './routes/locations';
import mongoose from "mongoose";

const app = express();

const publicPath = path.join(__dirname, '..', 'public');

app.use(logger('dev'));
// app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(express.static(publicPath));

app.set('dbConnection', connect(process.env.MONGO_URI))

mongoose.connection.on('error', error => debug('db')(error || ''));
mongoose.connection.once('open', () => debug('db')('MongoDB connected'));

app.use('/api/v1.0/location', locationRoutes);

app.use(error404);
app.use(errorHandler(app.get('env')));

export default app;
