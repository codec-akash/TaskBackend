const db = require('../database/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { response } = require('express');
const gauth = require('../middleware/getAuth');

exports.addtask = (req, res, next)=> { try{
    var user_id = gauth.getAuthUser(req);
    var {duration, task} = req.body;
    task_id = task[0] + Math.floor(Math.random() * 10000) + 1 + (new Date().getTime()).toString(36);
    


    let data = {task_id, user_id, duration, task};
    db.query("INSERT INTO tasks_info SET ?", data, (err, result)=> {
        if (err) throw err;

        res.status(200).json({
            message: "Successful"
        });

    })
} 

catch(err) {
    console.log(err);
}
    

}


exports.deletetask = (req, res, next)=>{
try{

    var user_id = gauth.getAuthUser(req);
    var {task_id} = req.body;
    
    let info = task_id;

    db.query("DELETE FROM tasks_info WHERE task_id = ?", info, (err, result)=> {
        if (err) throw err;

        res.status(200).json({
            message: result
        });

    })


}
catch(err) {
    console.log(err);
}
}