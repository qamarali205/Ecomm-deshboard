const express = require("express");
const cors = require("cors");
require("./db/config");
const User = require("./db/User");
const Product = require("./db/Product");
const multer=require('multer');
const { v2: cloudinary } = require('cloudinary');
const { CloudinaryStorage } = require('multer-storage-cloudinary')
const Jwt=require('jsonwebtoken');
const jwtKey='e-com';

const app = express();

app.use(express.json());

app.use(cors());

cloudinary.config({ 
  cloud_name: 'dvlbmm8sd', 
  api_key: '865539467454389', 
  api_secret: 'Fbt0liN6xs9yaKoq6k6kzKs9RMQ' 
});

// Upload file to Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'uploads', // The folder name in your Cloudinary account to store the images
    format: async (req, file) => 'jpg', // Set the desired image format
    public_id: (req, file) => 'image-' + Date.now(), // Generate a unique public ID for each image
  },
});

const upload = multer({ storage: storage }).single("image");

//upload file
// const upload = multer({
//   storage: multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, "uploads");
//     },
//     filename: function (req, file, cb) {
//       cb(null, file.fieldname + '-' + Date.now() + '.jpg');
//     },
//   }),
// }).single("image"); // Use "image" as the field name for the uploaded file

app.post("/signup", upload, async (req, res) => {
  try {
    // Extract the image path from the request
    const imagePath = req.file ? req.file.path : '';

    // Create a new user object with image path included
    let user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      image: imagePath, // Save the image path in the 'image' field
    });

    // Data insert in the database
    let result = await user.save();

    Jwt.sign({ result }, jwtKey, { expiresIn: "30d" }, (err, token) => {
      if (err) {
        res.send({ result: "Something went wrong, please try again" });
      }
      res.send({ result, auth: token });
    });
  } catch (error) {
    res.send({ error: "Record Not Saved" });
  }
});


//sign up api
// app.post("/signup", async (req, res) => {
//   try {
//     let user = new User(req.body);
//     //data insert in database
//     let result = await user.save();
//     // result.result.toObject();
//     // delete result.password;
//     Jwt.sign({result}, jwtKey, {expiresIn:"30d"},(err, token)=>{
//       if(err){
//         res.send({ result: "Somthing went wrong, Please try again" });
//       }
//       res.send({result ,auth:token});          
//     })
//     // console.log(req.body);
//   } catch (error) {
//     res.send({ error: "Record Not Saved" });
//   }
// });

// login api

app.post("/login", async (req, res) => {
  // res.send(req.body);
  try {
    if (req.body.password && req.body.email) {
      let user = await User.findOne(req.body).select("-password");
      if (user) {
        Jwt.sign({user},jwtKey, {expiresIn:"30d"},(err, token)=>{
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
