var express = require('express');
var _ = require("lodash");
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  if (!req.session.users){
    req.session.users = [{
      id: 1,
      name: "chris",
      email: "chrisdrobison@gmail.com"
    },{
      id: 2,
      name: "marci",
      email: "marcidrobison@gmail.com"
    }];
  }
  res.render("users/index", {users: req.session.users});
});

router.get("/create", function(req, res, next){
  res.render("users/create");
});

router.post("/create", function(req, res, next){
  if (!req.session.users){
    req.session.users = [];
  }
  req.session.users.push({
    id: parseInt(req.body.id),
    name: req.body.name,
    email: req.body.email
  });
  res.redirect("/users");
});

router.post("/delete/:id", function(req, res, next){
  req.session.users = _.remove(req.session.users, function(user){
    return user.id === parseInt(req.params.id);
  });
  res.redirect("/users");
});

module.exports = router;
