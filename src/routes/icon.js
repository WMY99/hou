var express = require('express');
var router = express.Router();
var classifyAPI = require("./classify")
    /* GET users listing. */
    ////查询所有的自定义分类
router.get('/', classifyAPI.classify);
//查询所有的分类   添加
router.post("/find", classifyAPI.all)
module.exports = router;