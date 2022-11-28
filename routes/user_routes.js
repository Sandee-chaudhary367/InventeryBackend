const express = require('express');
const auth = require('../middleware/auth');
const user = require('../models/user');

const router=new express.Router();

router.post("/login",async(req,res)=>{
    try{
        const loggedUser=await user.findOne({
            email:req.body.email,
        });
        if(!loggedUser){
            return  res.status(404).send("Not Found");
        }
        let rest=await loggedUser.comparePassword(req.body.password);
        //console.log(rest);
        if(!rest){
            return  res.status(404).send("Password do not matched");
        }
        let token= await loggedUser.generateAuthToken();
        let loggedUserReturnable=loggedUser.toJSON();
        loggedUserReturnable.Token=token;
        res.json(loggedUserReturnable);
    }catch(e){
        console.log(e);
        res.status(400).send(e);
    }
})


router.post("/signup",async(req,res)=>{
    try{
    //console.log(req.body);
    const userInfo=req.body;
    const newUser=new user(userInfo);
    //console.log(newUser);
    await newUser.save();
    let token= await newUser.generateAuthToken();
    let newUserReturnable=newUser.toJSON();
    newUserReturnable.Token=token;
    let userId = newUserReturnable._id;
    //console.log(userId);
    res.json(newUserReturnable);
    }catch(e){
        console.log(e);
        res.status(400).send(e);
    }
})

module.exports=router