var mysql = require('mysql')
var dbConfig = require('../../db/DBConfig')
var registerSql = require('../../db/web/registerSql')
var express = require('express')
var md5 = require('md5-node')
var date = require("silly-datetime")
// var multiparty = require('multiparty')
// const multer = require('multer')
// const fs = require('fs')
// var path = require('path')
var router = express.Router()

// 使用DBConfig.js的配置信息创建一个MySql链接池
var pool = mysql.createPool(dbConfig.mysql)
// 响应一个JSON数据
var responseJSON = function (res, ret) {
    if (typeof ret === 'undefined') {
        res.json({
            code: '-200',
            msg: '操作失败',
        })
    } else {
        res.json(ret)
    }
}

router.post('/', function (req, res, next) {
    pool.getConnection(function (err, connection) {
        // 获取前台页面传过来的参数
        var param = req.body
        var Userphone = param.phone
        var _res = res
        connection.query(registerSql.queryAll, function (err, res) {
            var isTrue = false,
                data = {};
            if (res) {
                //获取用户列表，循环遍历判断当前用户是否存在
                for (var i = 0; i < res.length; i++) {
                    if (res[i].phone == Userphone) {
                        isTrue = true
                    }
                }
                if (isTrue) {
                    data = {
                        code: -1,
                        msg: '该手机号已注册！',
                    }
                } else {
                    connection.query(
                        registerSql.insert,
                        [md5(param.password), parseInt(param.phone), date.format(new Date(), 'YYYY-MM-DD HH:mm:ss')],
                        function (err, result) {
                            if (result) {
                                data = {
                                    code: 200,
                                    msg: '注册成功',
                                }
                            } else {
                                data = {
                                    code: -1,
                                    msg: '注册失败',
                                }
                            }
                        }
                    )
                }
            } else {
                data = {
                    code: -1,
                    msg: '系统繁忙',
                }
            }

            if (err) data.err = err
            // 以json形式，把操作结果返回给前台页面
            setTimeout(function () {
                responseJSON(_res, data)
            }, 300)
            // 释放链接
            connection.release()
        })
    })
})

module.exports = router
