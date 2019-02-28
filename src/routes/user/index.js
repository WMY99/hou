/*
 * @Author: 王美悦 
 * @Date: 2019-02-23 09:55:50 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-02-27 14:05:15
 * 添加用户
 */
var Mongo = require('Mongodb-curd');
var batabaseName = "ningmeng"
var collcationName = "user"



//添加user数据
function addUser(req, res, next) {

    if (!req.query.username) {
        return res.send({ code: 3, msg: "缺少参数！" })
    }
    var user = req.query.username
    Mongo.find(batabaseName, collcationName, { "username": user }, function(result) {
        if (!result) {
            res.send({
                code: 0,
                mes: "error"
            })
        } else {
            if (result.length == 0) {
                Mongo.insert(batabaseName, collcationName, { "username": user }, function(result) {
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
            } else {
                res.send({ code: 4, msg: "该用户名已存在" })
            }
        }
    })





}












module.exports = {
    addUser: addUser
}