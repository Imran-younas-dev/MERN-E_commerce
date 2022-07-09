import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Carousel from "react-material-ui-carousel";
import MetaData from "../layout/MetaData";
import { useSelector, useDispatch } from "react-redux";
import ReactStars from "react-rating-stars-component";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { clrAllErrs, getProductDetails } from "../../Redux/Actions/productAction";
import "./ProductDetails.css";
import ReviewCard from './ReviewCard'
import Loader from '../layout/Loader/Loader';
import  {useAlert} from 'react-alert'
const ProductDetails = ({ match }) => {
  // we use id in this function in
  // backend =>req.params.id
  // frontEnd => match.params.id

  const dispatch = useDispatch();
  const alert = useAlert();
  const { product, loading, error } = useSelector((state) => state.product);

  useEffect(() => {
        if(error){
            alert.error(error);
            dispatch(clrAllErrs());
        }
    dispatch(getProductDetails(match.params.id));
  }, [dispatch, match.params.id,error,alert,loading]);
  
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
      {
        loading ? <Loader /> :
        <>
  <MetaData title={`${product.name} --| IK-Shop`} />

        <div className="SingleProductDetailes shadow-lg">
        <div>
          {/* <Carousel> */}
          {product.images &&
            product.images.map((item, i) => (
              <img
                className="Img"
                key={i}
                src={item.url}
                alt={`${i} Slide`}
              />
            ))}
          {/* </Carousel> */}
        </div>
        <div>
          <div className="detailproduct-row-1">
            <h2>{product.name}</h2>
            <p>Product # {product._id}</p>
          </div>
          <div className="detailproduct-row-2">
            <ReactStars {...options} /><span className="detailproduct-row-2_span">{`${product.numofReviews} - Reviews`}</span>        
          </div>
          <div className="detailproduct-row-3">
            <h1> {`RS : ${product.price}`}</h1>
            <div className="detailproduct-row-3_1">
              <div className="detailproduct-row-3_1_1">
                <button>-</button>
                <input value="1" type="number" />
                <button>+</button>
              </div>
              <button><span className="cart-icon"><ShoppingCartIcon /></span>Add to Cart</button>
            </div>
            <p>
              Status :
              <b className={product.Stock < 1 ? "redcolr" : "greenColor"}>
                {product.Stock < 1 ? "OutOfStock" : "InStock"}
              </b>
            </p>
          </div>
          <div className="detailproduct-row-4">
                Description : <p>{product.description}</p>
          </div>
          <button className="submitReview">
              Submit Review
          </button>
        </div>
      </div>

        <h1 className="ReviewHead">Reviews</h1>
        {
          // if product review then product review first then map 
          product.Reviews && product.Reviews[0] ? (
            <div className="reviewsContainer">
              {product.Reviews && 
              product.Reviews.map((review)=> <ReviewCard review = {review} /> )}
            </div>
          ) :(
            <p className="Noreview">No Review in this product</p>
          ) 
        }
        </>
      }


    </>
  );
};

export default ProductDetails;
