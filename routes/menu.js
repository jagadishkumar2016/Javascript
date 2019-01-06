var express = require('express');
var router = express.Router();
var menu_module = require('../node_modules_managed/menu_module');

/* GET menu listing. */
router.get('/', function(req, res, next) 
{
  res.setHeader("content-type", "application/json");
  res.end(menu_module.menuItems);
  
});


router.post('/addItem',function(req,res,next){
  var newItem = req.body.item;
  res.setHeader("content-type","application/json");
  menu_module.setNewItem(newItem);
  var resp = menu_module.addItem();
  res.end(resp);

});

router.get('/starters',function(req,res)
{
  res.setHeader("content-type", "application/json");
  res.end(menu_module.starters);
});

router.get('/maincourse',function(req,res)
{
  res.setHeader("content-type", "application/json");
  res.end(menu_module.maincourse);
});


router.get('/desserts',function(req,res)
{
  res.setHeader("content-type", "application/json");
  res.end(menu_module.desserts);
});


router.get('/drinks',function(req,res)
{
  res.setHeader("content-type", "application/json");
  res.end(menu_module.drinks);
});


module.exports = router;
