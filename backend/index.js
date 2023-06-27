const express = require("express");
const cors = require("cors");
require("./db/config");
const User = require("./db/User");
const Product = require("./db/Product");

const app = express();

app.use(express.json());

app.use(cors());

//sign up api
app.post("/signup", async (req, res) => {
  try {
    let user = new User(req.body);
    //data insert in database
    let result = await user.save();
    // result.result.toObject();
    // delete result.password;
    res.send(result);
    // console.log(req.body);
  } catch (error) {
    res.send({ error: "Record Not Saved" });
  }
});

// login api

app.post("/login", async (req, res) => {
  // res.send(req.body);
  try {
    if (req.body.password && req.body.email) {
      let user = await User.findOne(req.body).select("-password");
      if (user) {
        res.send(user);
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
app.post("/add-product", async (req, res) => {
  try {
    let product = new Product(req.body);
    let result = await product.save();
    res.send(result);
  } catch (error) {
    res.send({ error: "Error to add product" });
  }
});

// all proudct get api
app.get("/products", async (req, res) => {
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
app.delete("/product/:id", async (req, res) => {
  try {
    const result = await Product.deleteOne({ _id: req.params.id });
    res.send(result);
  } catch (error) {
    res.send({ errr: "Error" });
  }
});

// get single product api

app.get("/update/:id", async (req, res) => {
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

app.get('/search/:key', async(req, res)=>{

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
})

app.listen(5000);
