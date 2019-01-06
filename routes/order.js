var express = require('express');
var router = express.Router();
var fs = require('fs');
var config = require('../data/config');
var order_module = require('../node_modules_managed/order_module');

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

/* GET menu listing. */
router.get('/', function(req, res, next) 
{
  res.setHeader("content-type", "application/json");
  order_module.setSessionUser(user);
  var obj = order_module.getAllOrdersForUser();
  res.end(JSON.stringify(obj));
  
});


router.get('/createdummy', function(req, res, next) 
{
  res.setHeader("content-type", "application/json");
  order_module.setSessionUser(user);
  order_module.setCurrentOrder(orderTemplate);
  order_module.generateOrderReciptForUser();
  var obj = order_module.getAllOrdersForUser();
  res.end(JSON.stringify(obj));
  
});


router.post('/neworder', function(req, res, next) 
{
  var resp = getCodesJSON();
  res.setHeader("content-type", "application/json");
  if(req.session.uname)
  {
    user.name = req.session.name;
    user.email = req.session.email;
    user.uname = req.session.uname;
    user.phone = req.session.phone;
    user.address = req.session.address;
    user.id = req.session.uniqueID;
    var order = JSON.parse(JSON.stringify(req.body.orderItems));
    order_module.setSessionUser(user);
    order_module.setCurrentOrder(order);
    var respOBJ = order_module.generateOrderReciptForUser();
    res.send(respOBJ);
  }
  else
  {
    res.send(resp.forbidden);
  }
  
  
});


function getCodesJSON()
{
    var stringIn = fs.readFileSync(config.dataFolderPath + '/codes.json',"utf8").trim();
    return JSON.parse(stringIn);
}


module.exports = router;
