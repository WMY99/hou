var express = require('express');
var router = express.Router();
var billAPI = require("./bills")
    /* GET users listing. */

//记账
router.post("/getbill", billAPI.bill)
    //查询
router.post("/findbill", billAPI.findBill)

router.get("/delBill", billAPI.delBill)
module.exports = router;