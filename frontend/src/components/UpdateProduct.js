import React, { useEffect, useState } from "react";
import {useParams, useNavigate} from 'react-router-dom';

const UpdateProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const [error, setError]=useState(false);

  const params=useParams();
  const navigate=useNavigate();

  useEffect(()=>{
    
    getProductDetail();

  },[]);

  const getProductDetail=async ()=>{
     console.log(params);

    let result=await fetch(`http://localhost:5000/update/${params.id}`);
    result= await result.json();
    console.log(result);
    setName(result.name);
    setPrice(result.price);
    setCategory(result.category);
    setCompany(result.company);

  }

  const updateProductHandle=async ()=>{
    console.log(name,price,category,company);
    let result=await fetch(`http://localhost:5000/update/${params.id}`,{
      method:'Put',
      body:JSON.stringify({name,price,category,company}),
      headers:{
        'Content-Type':"application/json"
      }
    });
    result=await result.json();
    console.log(result);
    navigate('/');

    
  }

  return (
    <div className="product">
      <h1>Update Product</h1>
      <input
        type="text"
        value={name}
        onChange={(e)=>setName(e.target.value)}
        className="inputBox"
        placeholder="Enter product name"
      />
      
      <input
        type="text"
        value={price}
        onChange={(e)=>setPrice(e.target.value)}
        className="inputBox"
        placeholder="Enter product price"
      />
      
      <input
        type="text"
        value={category}
        onChange={(e)=>setCategory(e.target.value)}
        className="inputBox"
        placeholder="Enter product category"
      />
      
      <input
        type="text"
        value={company}
        onChange={(e)=>setCompany(e.target.value)}
        className="inputBox"
        placeholder="Enter product company"
      />
      

      <button onClick={updateProductHandle} className="addBtn">Update Product</button>
    </div>
  );
};


export default UpdateProduct;
