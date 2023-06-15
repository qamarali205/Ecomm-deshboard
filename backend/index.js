const express=require('express');
const cors=require('cors');
require('./db/config');
const User=require('./db/User');
const Product=require('./db/Product');

const app=express();

app.use(express.json());

app.use(cors());

app.post('/signup', async(req,res)=>{
    let user=new User(req.body);
    //data insert in database
    let result=await user.save();
    // result.result.toObject();
    // delete result.password;
    res.send(result);
    // console.log(req.body);
});


// login api

app.post('/login', async(req,res)=>{
    // res.send(req.body);
   if(req.body.password && req.body.email){
        let user=await User.findOne(req.body).select('-password');
        if(user){
        res.send(user);
        }else{
            res.send({result:"No User Found"});
        }
   }else{
    res.send({result:"No User Found"});
   }
});

app.post('/add-product',async(req,res)=>{
    let product=new Product(req.body);
    let result=await product.save();
    res.send(result);
})




app.listen(5000);