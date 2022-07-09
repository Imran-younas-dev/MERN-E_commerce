import React, { useEffect } from 'react'
import axios from "axios"

const API = () => {
  const getProducts = async() =>{
    return  await axios.get("http://localhost:5000/api/v1/products")
    .then((response)=>{
        console.warn(response.data);
    });
}
useEffect(()=>{
    getProducts();
});

  return (
    <div>API</div>
  )
}

export default API
