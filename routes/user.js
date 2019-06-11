const express = require('express');
const path = require('path');
const formidable = require('formidable');
const router = express.Router();
const product = require("../models/adduser");
var userdata = [];

router.get("/", function(req, res) {
    res.render("register");
})

router.post('/', function(req, res) {
    const form1 = new formidable.IncomingForm();
    //form1.keepExtensions = true;
    //form.uploadDir = path.join(__dirname, "../", "uploads");
    form1.parse(req, function(err, fields, files) {
        if (err) throw err;
        //保存数据
        var userobj = {
            ...fields,
            // pic: "/" + path.basename(files.pic.path),

        }
        var adduserInstance = new product(userobj); //集合的实例 一条数据
        // productIstance.save(); //保存数据
        adduserInstance.save();


        console.log("增加成功success");

        res.redirect('/register/userlist');

    })
})



router.get('/userlist', function(req, res) {
    //  console.log(arr)
    //获取数据

    product.find({}, function(err, results) {
        if (err) throw err;
        res.render('userlist', { userdata: results })
    })

})
module.exports = router;