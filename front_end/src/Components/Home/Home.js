import {useEffect} from 'react'
import { CgMouse } from  "react-icons/cg";
import Loader from '../layout/Loader/Loader';
import  {useAlert} from 'react-alert'
import './Home.css';
import Products from "./Products.js";
import MetaData from '../layout/MetaData';
// getproduct from Action
import {useDispatch,useSelector} from "react-redux"
import { clrAllErrs, getProduct } from '../../Redux/Actions/productAction';
// we can't use directly in redux => useSelector or  useDispatch
const Home = () => {

const alert = useAlert();
const dispatch = useDispatch();
const { loading , error ,products}  = useSelector((state) => state.products);
// we will get data from state using use selector
//using UseEffect 
useEffect(() =>{
    if(error){
        alert.error(error);
        dispatch(clrAllErrs())
    }
dispatch(getProduct());
},[dispatch, error,alert]);

// Temparay data use for check
    // const product = {
    //     name : "T-Shirt",
    //     images : [{url : "https://images.unsplash.com/photo-1583744946564-b52ac1c389c8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8dCUyMHNoaXJ0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"}],
    //     price : "30$",
    //     _id : "dfd"
    //  };
  return (
        <>
        {loading ? <Loader /> : (
            <>
            <MetaData title="IK-EShop Web App" />
            <div className='banner'> 
            <p>Welcome to IK-E-Shop</p>
            <h1>Find Amazing Products bellow</h1>
            <a href='#Cont'>
                <button><span style={{marginLeft : "1rem",marginRight : "0.25rem", fontSize :"1rem"}}>Scroll</span><CgMouse /></button>
            </a>
            </div>
            <h2 className='proHeading'>Products</h2>
            <div className='Cont' id='Cont'>
                {/* we will add products */}
                {
                    products && 
                    products.map((product) => (
                        <Products key={product._id} product={product} />
                    ))
                }
                {/* <Products product = {product} />
                <Products product = {product} />
                <Products product = {product} />
                <Products product = {product} />
                <Products product = {product} />
                <Products product = {product} />
                <Products product = {product} />
                <Products product = {product} /> */}
    
            </div>
            </>
    
        )}
        </>
    )
}

export default Home;