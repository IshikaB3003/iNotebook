const express = require('express');
const router = express.Router();

router.get('/',(req,res)=>{
    res.send("uo");
    // res.json([])
})

module.exports = router