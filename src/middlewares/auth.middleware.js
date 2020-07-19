const { verify } = require("jsonwebtoken");
const { ErrorHelper } = require("../helpers");
const { JWT_SECRET } = require("../config");

module.exports = function (req, res, next) { 
    const token = req.headers["authorization"];
    if (!token)
        ErrorHelper(404, "Token must be sent");
    
    verify(token, JWT_SECRET, function (err, decodedToken) {
        if (err)
            ErrorHelper(401, "Invalid Token");
        req.user = decodedToken;
        next();
    });
}