import {useEffect, useState} from 'react'
import './AllProducts.css';
import {useDispatch,useSelector} from 'react-redux'
import {getProduct,clrAllErrs} from '../../Redux/Actions/productAction';
import Loader from '../layout/Loader/Loader';
import Products from '../Home/Products';
import Pagination from 'react-js-pagination';
import MetaData from '../layout/MetaData';
// MUI
import Slider from '@material-ui/core/Slider'
import  Typography  from '@material-ui/core/Typography';


const categories = ["Laptop","Begs","T-shirt","Mobile", "Tablet","Shoes","Headphone","Belt"]

const AllProducts = ({match}) => {
const [category,setCategory] = useState("");
 const [currentPage, setcurrentPage] = useState(1);
 const [price, setprice] = useState([0,30000]);
 
const dispatch = useDispatch();
const { loading , error ,products, productCount,resultPerPage}  = useSelector((state) => state.products);
const keyword = match.params.keyword;
const priceHandler = (e,newPrice) =>{
  setprice(newPrice);
}


const setcurrentPageNum = (e) =>{
  setcurrentPage(e)
  }
  


  useEffect(() =>{
      if(error){
          alert.error(error);
          dispatch(clrAllErrs())
      }
  dispatch(getProduct(keyword,currentPage,price,category));
  },[dispatch, error,alert,keyword,currentPage,price,category]);
  
  return (
  <>
  {loading ? <Loader /> :
  <>
  <MetaData title="Products | IK-Shop" />
   <h1 className='Productheading'>ALL Products</h1>
   <div className='AllproductList'>
  
   {
     products && products.map((product =>(
        <Products key={product._id} product={product} />
     )))
   }
      </div>
<div className='FilterBox'>
 <Typography>Price</Typography>
 <Slider 
 value={price}
 onChange = {priceHandler}
 valueLabelDisplay = "auto"
 aria-labelledby='range-slider'
 min= {0}
 max={30000}
 />
{/* Categories */}
<Typography>Categories</Typography>
<ul className='Categories'>
{
  categories.map((category)=>(
    <li className='Category-type' key={category} onClick={()=>setCategory(category)}>
      {category}
    </li>
  ))
}
</ul>


</div>



   {
    //  both condition true then show 
    // 12 < 10 then not show pagination
     resultPerPage < productCount && (
      <div className='pagination_block'>
      <Pagination 
      activePage={currentPage}
      itemsCountPerPage={resultPerPage}
      totalItemsCount={productCount}
      onChange = {setcurrentPageNum}
      nextPageText = 'Next'
      prevPageText= 'Prev'
      firstPageText='1st'
      lastPageText= 'last'
      itemClass='page-item'
      linkClass='page-link'
      activeClass='pageItemActive'
      activeLinkClass="pageLinkeActive"
      />
    </div>
     ) 
   }
  </>}
  </>
    )
}

export default AllProducts;