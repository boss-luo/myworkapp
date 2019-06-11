const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const formidable = require('formidable');
const product = require("../models/product");
const login = require('../middlewares/login'); //引入判断权限中间件
router.get('/delete/:id', login, function(req, res) {
    // req.params.id
    //根据id查询数据库，然后删除此条数据
    product.findByIdAndRemove(req.params.id, function(err) {
        if (err) throw err;
        console.log("删除成功");
        //删除图片
        fs.unlink(path.join(__dirname, "../", 'uploads', req.query.img), function(err) {

            if (err) throw err;
            console.log("图片删除成功")
        });
        //重定向上级路由
        //res.redirect('back');
        res.redirect('/add/list');


    })
})
router.get('/update/:id', login, function(req, res) {
    // req.params.id
    //根据id查询数据库
    product.findById(req.params.id, function(err, result) {
        if (err) throw err;
        //在回调函数里提供更新数据的页面 update.ejs
        res.render("update", { data: result })
    })


})

router.post('/update/:id', login, function(req, res) {
    const form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.uploadDir = path.join(__dirname, "../", "uploads");
    form.parse(req, function(err, fields, files) {
        if (err) throw err;
        var obj = {
                ...fields,
                updateAt: new Date() //更新的时间段
            }
            //判断数据图片有没有更新
        if (files.pic.name) {
            obj.pic = "/" + path.basename(files.pic.path);
        } else { //图片没有更新

        }
        product.findByIdAndUpdate(req.params.id, obj, function(err) {
            if (err) throw err;
            console.log("更新成功");
            res.redirect('/add/list')
        })
    })
})


module.exports = router;