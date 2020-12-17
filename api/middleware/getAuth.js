const jwt = require('jsonwebtoken');
const express = require('express');

var methods = {};
methods.getAuthUser = function (req) {
    var token = req.headers['x-access-token'];
    var user_id;
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
            user_id = decoded.user_id;
            console.log(decoded.user_id);
        });
    }
    return user_id;
}

module.exports = methods;