const express=require('express');
const cors=require('cors');
require('./db/config');
const User=require('./db/User');
const Product=require('./db/Product');

const app=express();

app.use(express.json());

app.use(cors());


//sign up api
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

// add product api
app.post('/add-product',async(req,res)=>{
    let product=new Product(req.body);
    let result=await product.save();
    res.send(result);
})

// all proudct get api
app.get('/products', async(req,res)=>{
    let product=await Product.find();
    if(product.length>0){
        res.send(product);
    }else{
        res.send({result:"No products found"});
    }
});

//delete product api
app.delete('/product/:id',async (req,res)=>{
    
    const result=await Product.deleteOne({_id:req.params.id});
    res.send(result);

})

// get single product api

app.get('/product/:id', async(req,res)=>{
    let result=await Product.findById({_id:req.params.id});
    if(result){
        res.send(result);
    }else{
        res.send("No Record Found.")
    }

})

app.listen(5000);