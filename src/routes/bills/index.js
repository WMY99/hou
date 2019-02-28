var Mongo = require('Mongodb-curd');
var batabaseName = "ningmeng"
var collcationName = "bill"

//开始记账
function bill(req, res, next) {
    var parmes = req.body
        //判断是否完整参数 
        //uid个人的_id    cid所有分类里的某一个 _id    monry钱    time 时间
    if (!parmes.uid || !parmes.cid || !parmes.monry || !parmes.time || !parmes.icon || !parmes.type || !parmes.cont) {
        res.send({ code: 3, msg: "参数不完整！" })
    } else {
        //添加
        addBill(req, res, next)

    }
    //数据完整时，添加到bill里
    function addBill(req, res, next) {
        Mongo.insert(batabaseName, collcationName, parmes, function(result) {
            if (!result) {
                res.send({
                    code: 0,
                    mes: "error"
                })
            } else {
                res.send({
                    code: 1,
                    mes: "success",
                })
            }
        })
    }

}
//查看bill所有信息
function findBill(req, res, next) {
    var query = req.body
        //判断查询的参数
    if (!query.uid || !query.time) {
        return res.send({ code: 3, msg: "参数不全！" })
    }
    var reg = new RegExp("^" + query.time)
    if (!query.cont) { //如果查询的类型不存在
        data = {
            "uid": query.uid,
            "time": reg,
        }
    } else {
        data = {
            "uid": query.uid,
            "time": reg,
            "cont": { "$in": query.cont.split(",") }
        }
    }

    Mongo.find(batabaseName, collcationName, data, function(result) {
        if (!result) {
            res.send({
                code: 0,
                mes: "error"
            })
        } else {
            if (result.length == 0) {
                res.send({ code: 0, msg: "暂无数据哦！" })
            } else {
                res.send({ code: 1, msg: "success", data: result })
            }
        }

    })
}

//删除
function delBill(req, res, next) {
    var id = req.query.id; //根据_id进行筛选，进行删除
    if (!id) {
        res.send({ code: "0", msg: "参数不全！" })
    } else {
        Mongo.remove(batabaseName, collcationName, { "_id": id }, function(result) {
            if (!result) {
                res.send({
                    code: 0,
                    mes: "error"
                })
            } else {
                res.send({
                    code: 1,
                    mes: "success",
                    data: result
                })
            }
        })
    }
}



module.exports = {
    bill: bill,
    findBill: findBill,
    delBill: delBill
}