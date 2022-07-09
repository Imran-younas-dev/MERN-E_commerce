import React from 'react'
import {Link} from "react-router-dom"
import ReactStars from "react-rating-stars-component";
import "./Home.css";
const Products = ({ product }) => {
  const options= {
        edit : false,
        color : "rgba(20,20,20,3.1)",
        activeColor : "tomato",
        value : product.ratings,
        isHalf : true,
        size : window.innerWidth < 600 ? 15 : 20,
  }
    return (
   <>
   <Link className='prodCard' to={`product/${product._id}`}>
    <img src={product.images[0].url} alt={product.name}/>
    <p>{product.name}</p>
    <div>
        <ReactStars {...options} /><span>{`${product.numofReviews} - Reviews`}</span>
    </div>
    <span> {`RS : ${product.price}`}</span>
   </Link>
   </>
    )
}

export default Products