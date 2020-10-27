const jwt = require('jsonwebtoken');
const express = require('express');

var methods = {};
methods.getAuthUser = function (req) {
    var token = req.headers['x-access-token'];
    var userId;
    console.log(token);
    if (token) {
        jwt.verify(token, "MYSECERTKEY", function (err, decoded) {
            if (err) {
                let errordata = {
                    message: err.message,
                    expiredAt: err.expiredAt
                };
                console.log(errordata);
                return res.status(401).json({
                    message: 'Unauthorized Access',
                    error: errordata
                });
            }
            req.decoded = decoded;
            userId = decoded.userId;
            console.log(decoded.userId);
        });
    }
    return userId;
}

module.exports = methods;