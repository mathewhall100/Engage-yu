const jwt = require("express-jwt");
const jwtAuthz = require("express-jwt-authz");
const jwksRsa = require("jwks-rsa");
require('dotenv').config();

// Authentication middleware 
// Access token (from axios authorization header) must exist and be verified against Auth0 JSON Web Key Set
exports.getCheckToken = function(){
    return jwt({
    // dynamically provide signing key
    secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://engageyu-dev.auth0.com/.well-known/jwks.json`
    }),
    // validate the audience and the issuer.
    audience: process.env.AUDIENCE,
    issuer: "https://engageyu-dev.auth0.com/",
    algorithm: ['RS256']
    })
}
