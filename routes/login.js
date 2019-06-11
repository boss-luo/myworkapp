const express = require('express');
const router = express.Router();
const path = require('path');

//const formidable = require('formidable');


const user = require("../models/user");

router.get("/", function(req, res) {
    res.render("login");
})
router.post('/', function(req, res) {
    console.log(req.body);
    //集合实例
    //扩展运算符，把类数组对象展开成一系列用逗号隔开的值
    var userInstance = new user({...req.body });
    //集合的实例 一条数据
    // productIstance.save(); //保存数据
    userInstance.save();
    /*
    //设置cookie
    //设置过期时间 毫秒
    res.cookie("username", req.body.username, { maxAge: 60 * 1000 });
    res.cookie("password", req.body.password, { maxAge: 60 * 1000, signed: true });
*/
    //使用session
    req.session.username = req.body.username;
    req.session.password = req.body.password;
    //s%3A_mxGTqmj0Q8Hu-EbJf2Qvn58Vag_G8CU.odQt1kw1Ic3FZdbT5Z6FRiYZD8EazB1Dw5d8js0pMWc
    //值对应着sessionId 对象
    res.redirect('/add/list');
    res.end("success");

})




module.exports = router;