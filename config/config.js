"use strict"

var rc = require('rc');

module.exports = rc('leflair', {
    port: process.env.PORT || 3000,
    devPort: process.env.DEV_PORT || 9000,
    db: {
        uri: process.env.LEFLAIR_MONGO_URI || 'mongodb://localhost/leflair-graphql'
    }
});
