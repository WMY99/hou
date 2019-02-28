/*
 * @Author: 王美悦 
 * @Date: 2019-02-23 09:55:50 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-02-26 19:41:34
 * 操作分类
 */
var Mongo = require('Mongodb-curd');
var batabaseName = "ningmeng"
var collcationName = "icon"


//查询所有的自定义分类
function classify(req, res, next) {
    Mongo.find(batabaseName, collcationName, {}, function(result) {
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


//查询所有的分类   添加
function all(req, res, next) {
    var parmes = req.body
    console.log(parmes)
    if (!parmes.icon || !parmes.cont || !parmes.uid || !parmes.type) {
        return res.send({ code: 3, msg: "缺少条件！" })
    }
    isall()

    //判断数据库中是否含有数据 
    function isall() {
        var collcationName = "classfig"
        Mongo.find(batabaseName, collcationName, {
                "cont": parmes.cont,
                "uid": { "$in": ["all", parmes.uid] },
                type: parmes.type
            },
            function(result) {
                if (result.length) {
                    return res.send({ code: 4, msg: "已经存在" })
                }
                addfind()
            })


    }
    //添加
    function addfind() {
        var collcationName = "classfig"
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
                    data: result
                })
            }
        })
    }
}


module.exports = {
    classify: classify,
    all: all
}