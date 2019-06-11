const express = require('express');
const path = require('path');
const formidable = require('formidable');
const router = express.Router();
const product = require("../models/product");
const login = require('../middlewares/login'); //引入判断权限中间件
var arr = [];

router.get("/", login, function(req, res) {
        res.render("add");
    })
    //可以调用多个函数
router.post('/', login, function(req, res) {
    const form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.uploadDir = path.join(__dirname, "../", "uploads");
    form.parse(req, function(err, fields, files) {
        if (err) throw err;
        //保存数据
        var obj = {
            ...fields,
            pic: "/" + path.basename(files.pic.path),

        }
        var productInstance = new product(obj); //集合的实例 一条数据
        // productIstance.save(); //保存数据
        productInstance.save();


        res.redirect('/add/list');

    })
})

router.get('/list', function(req, res) {
    //  console.log(arr)
    //获取数据


    product.find({}, function(err, results) {
        if (err) throw err;
        res.render('list', { arr: results });
    })

})

module.exports = router;