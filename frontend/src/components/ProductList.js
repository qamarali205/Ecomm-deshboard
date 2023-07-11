import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

const ProductList=()=>{
    const [products, setProdcuts]=useState([]);


    useEffect(()=>{
        getProducts();

    },[]);
    

    const getProducts=async ()=>{
        let result=await fetch('http://localhost:5000/products',{
            headers:{
             authorization:JSON.parse(localStorage.getItem('token'))
            }
        });
         result=await result.json();
         setProdcuts(result);
    }

    console.log("products", products);

    const deleteProduct= async (id)=>{
        // console.log(id)
        let result=await fetch(`http://localhost:5000/product/${id}`,{
            method:"Delete"
        });
        result=await result.json();
        if(result){
            alert('Record deleted successfully');
            getProducts();
        }

    }
     const searchHandle=async (e)=>{
       console.log(e.target.value);
       let key=e.target.value;
       if(key){
        let result=await fetch(`http://localhost:5000/search/${key}`);
       
        result =await result.json();
        if(result){
            setProdcuts(result)
        }
       }else{
        getProducts();
       }
      

     }

    return (
        <div className='product_list'>
           <h3>Product List</h3>
           <input type='text'
            onChange={searchHandle}
            className='searchProduct'
            placeholder='Search Product'
            
            />
          {products.length>0?  <ul>
            <li>S. No</li>
            <li>Name:</li>
            <li>Price($)</li>
            <li>category:</li>
            {/* <li>userId:</li>
            <li>Company:</li> */}
            <li>Operation</li>
           </ul>:''  
           }         
           {
            products.length>0 ? products.map((item,index)=>
            <ul key={item._id}>
            <li>{index+1}</li>
            <li>{item.name}</li>
            <li>{item.price}</li>
            <li>{item.category}</li>
            {/* <li>{item.userId}</li> 
            <li>{item.company}</li>*/}
            <li><button onClick={()=>deleteProduct(item._id)}>Delete</button>
            <Link to={"/update/"+item._id}>Update</Link>
            </li>
           </ul>
            ):<h1>No record found</h1>
           }
        </div>

    );
}

export default ProductList;
