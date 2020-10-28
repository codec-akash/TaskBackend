const db = require('../database/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { response } = require('express');

exports.register = (req, res, next) => {
    var {email,name,pwd}= req.body;
    user_id = name[0] + Math.floor(Math.random() * 10000) + 1 + (new Date().getTime()).toString(36);

    bcrypt.hash(pwd, 10, (err, hash)=>{
        if (err) throw err;
        pwd = hash;
        
    

    let data = {name, user_id, pwd, email};
    db.query("SELECT * FROM user_info WHERE email = ?", [email], (err, result)=> {
        
        if (err) throw err;
        if (result.length > 0) 
        {
            res.status(404).json({
                message: "User already exists!"
            });
        }

        else 
        {
            let sqlregister = "INSERT INTO user_info SET ?";
            const token = jwt.sign({
                email: email,
                user_id: user_id

            },"MYSECERTKEY", {expiresIn: "1h"});
            db.query(sqlregister, data, (err, result)=> {
                if (err) throw err;
                res.status(200).json({
                    message: result, 
                    token: token
                });
            });

        }
    });
});
}

exports.login = (req, res, next)=>{
    var {email, pwd} = req.body;

    
    let loginSQL = "SELECT * FROM user_info WHERE email = ?";
    let data = {email};
    db.query("SELECT * FROM user_info WHERE email = ? ", [email], async function (err, result) {

        if(err) 
        {
          return  res.status(500).json({
                message: err
            });
        } 
        
        else if(result[0]==null)
        {
            res.status(401).json({
                message: "Unauthorized. Try again"
            });
        }

        else 
        {
           
            bcrypt.compare(pwd, result[0].pwd, (err, response)=>{

                
                if(err)
                {
                    return res.status(420).json({
                        message: "Incorrect User ID/Password!"
                    });
                }
                
                if(response)
                {
                    const token = jwt.sign({
                        email: result[0].email,
                        user_id: result[0].user_id
        
                    },"MYSECERTKEY", {expiresIn: "1h"});
                    return res.status(200).json({
                        message: "Logged in.",
                        token: token
                    });
                }
                else
                {
                    res.status(200).json({
                        message: "Incorrect Password! Try again.",
                    });
                }
            });
        }
    });
}