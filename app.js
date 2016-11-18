"use strict";

import express from 'express';
import graphqlHTTP from 'express-graphql';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import schema from './graphql';
import jwt_express from 'express-jwt';
import dotenv from 'dotenv';
import config from './config/config';
import logger from './config/logger';
import webpack from 'webpack';
import webpackConfig from './webpack.server.config';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackMiddleware from 'webpack-dev-middleware'

const isDeveloping = process.env.NODE_ENV !== 'production';



const app = express();
dotenv.load();

// app.use(function(req, res, next) {
//     var token = req.query.token || req.headers['x-access-token'];

//     if (token) {

//         // verifies secret and checks exp
//         jwt.verify(token, app.get('superSecret'), function(err, decoded) {
//             if (err) {
//                 return res.json({ success: false, message: 'Failed to authenticate token.' });
//             } else {
//                 // if everything is good, save to request for use in other routes
//                 req.decoded = decoded;
//                 next();
//             }
//         });

//     } else {

//         return res.status(403).send({
//             success: false,
//             message: 'No token provided.'
//         });

//     }
// })

var compiler = webpack(webpackConfig);
var middleware = new webpackMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    contentBase: 'http://localhost:3000',
    stats: {
        colors: true,
        hash: false,
        timings: true,
        chunks: true,
        chunkModules: true,
        modules: true
    }
})

app.use(middleware);
app.use(webpackMiddleware(compiler));

app.use(express.static(__dirname + 'dist'));


const authenticate = jwt_express({
    secret: new Buffer(process.env.AUTH0_CLIENT_SECRET, 'base64'),
    audience: process.env.AUTH0_CLIENT_ID
});

//GraphqQL server route
app.use('/product', graphqlHTTP(req => ({
    schema,
    pretty: true,
    graphiql: true
})));

app.use('/user', graphqlHTTP(req => ({
    schema,
    pretty: true,
    graphiql: true
})));

app.use('/',function(req,res){
	res.send('vl')
})

// Connect mongo database
mongoose.connect(config.db.uri, config.db);

// start server
var server = app.listen(config.port, () => {
    logger.debug('Leflair API listening at port', server.address().port);
});
