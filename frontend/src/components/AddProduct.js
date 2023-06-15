import React from "react";

const AddProduct = () => {
  const [name, setName] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [company, setCompany] = React.useState("");

  const addProductHandle=()=>{
    console.log(name,price,category,company);
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

      <button onClick={addProductHandle} className="addBtn">Add Product</button>
    </div>
  );
};

export default AddProduct;
