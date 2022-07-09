import React from 'react'
import ReactStars from "react-rating-stars-component";
import  profile from '../../Assets/Hasnain.jpg'
import "./ProductDetails.css";
const ReviewCard = ({review}) => {
    const options= {
        edit : false,
        color : "rgba(20,20,20,3.1)",
        activeColor : "tomato",
        value : review.rating,
        isHalf : true,
        size : window.innerWidth < 600 ? 15 : 20,
    }
  return (
<>
<div className='reviewCard shadow-lg'>
    <img src={profile} alt='user' />
    <p>{review.name}</p>
    <ReactStars {...options}/>
    <span>{review.Comment}</span>
</div>
</>
    )
}

export default ReviewCard