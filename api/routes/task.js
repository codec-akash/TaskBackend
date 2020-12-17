const express = require('express');
const router = express.Router();
const controller = require('../controllers/TaskController');
const checkauth = require("../middleware/check_auth");

router.post('/addtask', checkauth, controller.addtask);

router.delete('/deletetask', checkauth, controller.deletetask);

router.get('/gettask', checkauth, controller.gettask);

module.exports = router;