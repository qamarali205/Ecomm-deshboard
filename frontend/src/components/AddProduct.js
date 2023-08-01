import React from "react";

const AddProduct = () => {
  const [name, setName] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [company, setCompany] = React.useState("");
  const [error, setError]=React.useState(false);

  const addProductHandle=async ()=>{
    console.log(!name);
    if(!name || !price || !category || !company){
      setError(true);
      return false;
    }else{
    console.log(name,price,category,company);
    const userId=JSON.parse(localStorage.getItem('user'))._id;
    // console.log(userId._id);
    let result=await fetch("http://localhost:5000/add-product",{
      method:'post',
      body:JSON.stringify({name,price,category,company,userId}),
      headers:{
        "Content-Type":"application/json",
        authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
      }
    });
    result=await result.json();
    if(result){
      alert('Record add successfully');
    }
    console.log(result);
    setName('');
    setPrice('');
    setCategory('');
    setCompany('');
  }
  }

  return (
    <div className="product">
      <h1>Add Product</h1>
      <input
        type="text"
        value={name}
        onChange={(e)=>setName(e.target.value)}
        className="inputBox"
        placeholder="Enter product name"
      />
      {error && !name && <span className="error">Enter valid name</span>}
      <input
        type="text"
        value={price}
        onChange={(e)=>setPrice(e.target.value)}
        className="inputBox"
        placeholder="Enter product price"
      />
      {error && !price && <span className="error">Enter valid price</span>}
      <input
        type="text"
        value={category}
        onChange={(e)=>setCategory(e.target.value)}
        className="inputBox"
        placeholder="Enter product category"
      />
      {error && !category && <span className="error">Enter valid category</span>}
      <input
        type="text"
        value={company}
        onChange={(e)=>setCompany(e.target.value)}
        className="inputBox"
        placeholder="Enter product company"
      />
      {error && !company && <span className="error">Enter valid company</span>}

      <button onClick={addProductHandle} className="addBtn">Add Product</button>
    </div>
  );
};

export default AddProduct;
