import React, { useEffect, useState } from "react";
import {useParams} from 'react-router-dom';

const UpdateProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const [error, setError]=useState(false);

  const params=useParams();

  useEffect(()=>{
    
    getProductDetail();

  },[]);

  const getProductDetail=async ()=>{
     console.log(params);

    let product=await fetch(`http://localhost:5000/product/${params.id}`);
    

  }

  const updateProductHandle=async ()=>{
    console.log(name,price,category,company);
    
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
