var express = require('express');
var router = express.Router();
var fs = require('fs');
var config = require('../data/config');
var login_module = require('../node_modules_managed/login_module');

router.get("/",function(req,res)
{
  if(req.session.uname)
    {
      login_module.setUserName(req.session.uname);
      var resp = login_module.validateUser();
      req.session.save();
      var messg = {
        uname: req.session.uname,
        message : "session found",
        code:200,
        uuid: req.session.uniqueID
      }
      res.send(messg);
    }
    else
    {
      var messg = {
        uname: "null",
        message : "please login in first",
        code:100,
        uuid: -1
      }
      res.send(messg);
    } 
});


router.post('/authenticate', function(req, res) 
{
  var uname = req.body.uname;
  var psswd = req.body.psswd;
  login_module.setUserName(uname);
  login_module.setPasswpord(psswd);
  var resp = login_module.validateUser();
  if(resp.code == 409)
  {
    resp = login_module.authenticateUser();
    if(resp.code == 202)
    {
      req.session.uname = resp.uname;
      req.session.name = resp.name;
      req.session.email = resp.email;
      req.session.address = resp.address;
      req.session.phone = resp.phone;
      req.session.uniqueID = Math.round(Math.random()*1024+1,0);
      req.session.save();
      resp.id = req.session.uniqueID;
    }
  }
  res.setHeader("content-type", "application/json");
  res.send(resp);
});


router.get('/logout', function(req,res){
  var codes = getCodesJSON();
  delete req.session.uname;
  delete req.session.name;
  delete req.session.email;
  delete req.session.address;
  delete req.session.phone;
  delete req.session.uniqueID;
  req.session.save();
  res.send(codes.ok);
});

router.post('/getdetails', function(req, res) 
{
  var uname = req.body.uname;
  login_module.setUserName(uname);
  var resp = login_module.validateUser();
  if(resp.code == 409)
  {
    resp = login_module.getUserDetailsForUserId();
  }
  res.setHeader("content-type", "application/json");
  res.send(resp);
});

router.post('/add',function (req, res){

  if(!req.body.name || !req.body.uname || !req.body.password || !req.body.address || !req.body.phone || !req.body.email)
  {
     var messg = {
        code: 206,
        description: "incomplete data received"
      };
    res.send(JSON.stringify(messg));
  }
  else
  {
    var user = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        phone : req.body.phone,
        address : req.body.address,
        uname : req.body.uname,
        ordercount:"0"
      };
      login_module.setUserName(user.uname);
      var resp = login_module.validateUser();
      if(resp.code == 404)
      {
        login_module.setNewUser(user);
        resp = login_module.registerNewUser();
        req.session.uname = user.uname;
        req.session.uniqueID = Math.round(Math.random()*1024+1,0);
        req.session.save();
        resp.name = user.name;
        resp.uname = user.uname;
      }
      res.send(resp);
  }


  
});

function getCodesJSON()
{
    var stringIn = fs.readFileSync(config.dataFolderPath + '/codes.json',"utf8").trim();
    return JSON.parse(stringIn);
}


module.exports = router;
