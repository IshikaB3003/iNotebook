const express = require('express');
const { body, validationResult } = require('express-validator');
const User = require('../models/User')
const router = express.Router();


//Create a User using: POST "/api/auth/createuser". Doesn't require Authentication
//NO LOGIN REQUIRED
    // obj={
    //     a:'this',
    //     number: 45
    // }
    // res.json(obj)
    router.post('/createuser',[
        body('email').isEmail(),
        body('password').isLength({ min: 5 }),
        body('name','enter at least 3 chars').isLength({ min: 3 }),
    ], async (req,res)=>{
        const errors = validationResult(req);
        //to handle errors, return bad req
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        //to check if email already exists
        try{
        let user = await User.findOne({email: req.body.email});
        if(user){
            return res.status(400).json({error:"Sorry a user w this email already exists"})
        }
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
          })
          
        //   .then(user => res.json(user))
        //   .catch(err=>{console.log(err)
        //     res.json({error:'Please enter a unique value for email',message:err.message})})
          res.json({user});
        }catch(error){
            console.error(error.message);
            res.status(500).send("Some error occured");
        }

    })


module.exports = router

// res.send(req.body);