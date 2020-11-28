var express = require('express');
var router = express.Router();
var uid2 = require("uid2");
var SHA256 = require("crypto-js/sha256");
var encBase64 = require("crypto-js/enc-base64");
var userModel = require('../models/users')


router.post('/sign-up', async function(req,res,next){

  var error = []
  var result = false
  var saveUser = null
  var salt = uid2(32);

  const data = await userModel.findOne({
    email: req.body.emailFromFront
  })

  if(data != null){
    error.push('utilisateur déjà présent')
  }

  if(req.body.usernameFromFront == ''
  || req.body.emailFromFront == ''
  || req.body.passwordFromFront == ''
  ){
    error.push('champs vides')
  }


  if(error.length == 0){
    var newUser = new userModel({
      username: req.body.usernameFromFront,
      email: req.body.emailFromFront,
      password:  SHA256(req.body.passwordFromFront + salt).toString(encBase64),
      salt: salt,
      token: uid2(32)
      
    })
  
    saveUser = await newUser.save()
    
    
    if(saveUser){
      result = true
    }
  }
  

  res.json({result, saveUser:saveUser.token, error})
})

router.post('/sign-in', async function(req,res,next){

  var result = false
  
  var error = []
  
  if(req.body.emailFromFront == ''
  || req.body.passwordFromFront == ''
  ){
    error.push('champs vides')
  }

  if(error.length == 0){
var user = await userModel.findOne({ email: req.body.emailFromFront});
    
    if(user!=null){
      
      var hash = SHA256(req.body.passwordFromFront + user.salt).toString(encBase64);
    
    if (hash === user.password){
      token= user.token
      result = true
    } else {
      error.push('email ou mot de passe incorrect')
    }
    }
    else {
      error.push('email ou mot de passe incorrect')
    }
  }
  
  

  res.json({result, user, error, token})


})

module.exports = router;
