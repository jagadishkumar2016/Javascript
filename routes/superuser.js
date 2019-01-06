var express = require('express');
var router = express.Router();
var fs = require('fs');
var config = require('../data/config');
var admin_module = require('../node_modules_managed/admin_module');

var user = {
        name: "admin",
        email: "",
        phone : "",
        address : "",
        uname : "admin",
        ordercount:"0"
      };


var orderTemplate = {
    orderItems: [
        {
            itemName: "",
            itemCost: "",
            itemQuantity: ""
        }
    ]
}

router.get("/",function(req,res,next){
    var codes = getCodesJSON();
    if(req.session.uname)
    {
        if(req.session.uname == "i.am.admin")
        {
            res.send(codes.ok);
        }
        else
        {
            res.send(codes.forbidden);
        }
    }
});

router.get("/listusers",function(req,res,next){
    if(req.session.uname)
    {
        if(req.session.uname == "i.am.admin")
        {
            res.send(admin_module.getUserListing());
        }
        else
        {
            res.send(codes.forbidden);
        }
    }
});

router.get("/listorders",function(req,res,next){
    if(req.session.uname)
    {
        if(req.session.uname == "i.am.admin")
        {
            res.send(admin_module.getOrderListing());
        }
        else
        {
            res.send(codes.forbidden);
        }
    }
});

router.post("/getorderforuser",function(req,res,next){
    if(req.session.uname)
    {
        if(req.session.uname == "i.am.admin")
        {
            admin_module.setUser(req.body.user);
            res.send(admin_module.getAllOrdersForUser());
        }
        else
        {
            res.send(codes.forbidden);
        }
    }
});


router.post("/getuserdetails",function(req,res,next){
    if(req.session.uname)
    {
        if(req.session.uname == "i.am.admin")
        {
            admin_module.setUserName(req.body.uname);
            res.send(admin_module.getUserDetailsForUserId());
        }
        else
        {
            res.send(codes.forbidden);
        }
    }
});

router.post("/setorderforuser",function(req,res,next){
    if(req.session.uname)
    {
        if(req.session.uname == "i.am.admin")
        {
            admin_module.setUser(req.body.user);
            admin_module.setOrderForUser(req.body.order);
            res.send(admin_module.changeOrderStatusForUser());
        }
        else
        {
            res.send(codes.forbidden);
        }
    }
});

router.post("/addfooditem",function(req,res,next){
    if(req.session.uname)
    {
        if(req.session.uname == "i.am.admin")
        {
            admin_module.setNewFoodItem(req.body.foodItem);
            res.send(admin_module.addNewFoodItem());
        }
        else
        {
            res.send(codes.forbidden);
        }
    }
});





function getCodesJSON()
{
    var stringIn = fs.readFileSync(config.dataFolderPath + '/codes.json',"utf8").trim();
    return JSON.parse(stringIn);
}


module.exports = router;
