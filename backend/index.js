const express = require("express");
const cors = require("cors");
require("./db/config");
const User = require("./db/User");
const Product = require("./db/Product");

const Jwt=require('jsonwebtoken');
const jwtKey='e-com';

const app = express();

app.use(express.json());

app.use(cors());

//sign up api
app.post("/signup", verifyToken, async (req, res) => {
  try {
    let user = new User(req.body);
    //data insert in database
    let result = await user.save();
    // result.result.toObject();
    // delete result.password;
    Jwt.sign({result}, jwtKey, {expiresIn:"30d"},(err, token)=>{
      if(err){
        res.send({ result: "Somthing went wrong, Please try again" });
      }
      res.send({result ,auth:token});          
    })
    // console.log(req.body);
  } catch (error) {
    res.send({ error: "Record Not Saved" });
  }
});

// login api

app.post("/login", verifyToken, async (req, res) => {
  // res.send(req.body);
  try {
    if (req.body.password && req.body.email) {
      let user = await User.findOne(req.body).select("-password");
      if (user) {
        Jwt.sign({user},jwtToken, {expiresIn:"2h"},(err, token)=>{
          if(err){
            res.send({ result: "Somthing went wrong, Please try again" });
          }
          res.send({user ,auth:token});          
        })
        
      } else {
        res.send({ result: "No User Found" });
      }
    } else {
      res.send({ result: "No User Found" });
    }
  } catch (error) {
    res.send({ error: "Something error." });
  }
});

// add product api
app.post("/add-product", verifyToken, async (req, res) => {
  try {
    let product = new Product(req.body);
    let result = await product.save();
    res.send(result);
  } catch (error) {
    res.send({ error: "Error to add product" });
  }
});

// all proudct get api
app.get("/products", verifyToken, async (req, res) => {
  try {
    let product = await Product.find();
    if (product.length > 0) {
      res.send(product);
    } else {
      res.send({ result: "No products found" });
    }
  } catch (error) {
    res.send({ error: "Error" });
  }
});

//delete product api
app.delete("/product/:id", verifyToken, async (req, res) => {
  try {
    const result = await Product.deleteOne({ _id: req.params.id });
    res.send(result);
  } catch (error) {
    res.send({ errr: "Error" });
  }
});

// get single product api

app.get("/update/:id", verifyToken, async (req, res) => {
  try {
    let result = await Product.findOne({ _id: req.params.id });
    res.send(result);
  } catch (error) {
    res.send({ error: "No Record Found." });
  }
});

//update product api
app.put("/update/:id", async (req, res) => {
  try {
    let result = await Product.updateOne(
      { _id: req.params.id },
      {
        $set: req.body,
      }
    );
    res.send(result);
  } catch (error) {
    req.send({ error: "Result not found" });
  }
});


//search product api

app.get('/search/:key', verifyToken, async(req, res)=>{

    try {
        let result=await Product.find({
            "$or":[
                {name:{$regex:req.params.key}},
                {company:{$regex:req.params.key}},
                {price:{$regex:req.params.key}},
                {category:{$regex:req.params.key}}
            ]
        })
        res.send(result)

        
    } catch (error) {
        res.send({error:"Error"});
        
    }
});

//verify token 

function verifyToken(req, res, next){
  let token=req.headers['authorization'];
  if(token){
    token=token.split(' ')[1];
    console.log("middleware called", token);

    Jwt.verify(token, jwtKey, (err, valid) => {
      if(err){
        res.status(401).send("Please provide valid token");
      }else{
        next();
      }
    })
  }else{
    res.status(403).send("Please add token with headers");
  }
  
  
};


app.listen(5000);
