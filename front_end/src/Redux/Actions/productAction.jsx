import axios from 'axios';
import {ALL_PRODUCTS_FAIL,ALL_PRODUCTS_REQUEST,ALL_PRODUCTS_SUCCESS, CLEAR_ERRORS,
  PRODUCTS_DETAILS_FAIL,
  PRODUCTS_DETAILS_SUCCESS,
  PRODUCTS_DETAILS_REQUEST,
} from "../Constants/productConstant"



export const getProduct = (keyword = "",currentPage = 1, price = [0,30000],category) =>
  async (dispatch) => {
    try {
      dispatch({ type: ALL_PRODUCTS_REQUEST });
let url = `http://localhost:5000/api/v1/products?keyword=${keyword}&page=${currentPage}$price[gte]=${price[0]}&price[lte]=${price[1]}`;
if(category){
  url = `http://localhost:5000/api/v1/products?keyword=${keyword}&page=${currentPage}$price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}`; 
}    


const  { data } = await axios.get(url)
      // console.log(data);
      dispatch({
        type: ALL_PRODUCTS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ALL_PRODUCTS_FAIL,
        payload: error.response.data.message,
      });
    }
  };


export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCTS_DETAILS_REQUEST });
    const { data } = await axios.get(`http://localhost:5000/api/v1/product/${id}`);
    console.log(data);
    dispatch({
      type: PRODUCTS_DETAILS_SUCCESS,
      payload: data.product,
    });
  } catch (error) {
    dispatch({
      type: PRODUCTS_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};





  // export const getProductDetails = (id) =>
  // async (dispatch) => {
  //   try {
  //     dispatch({ type: PRODUCTS_DETAILS_REQUEST });

  //     const  { data } = await axios.get(`http://localhost:5000/api/v1/product/${id}`);
  //     dispatch({
  //       type: PRODUCTS_DETAILS_SUCCESS,
  //       payload: data.getSingleProduct,
  //     });
  //   } catch (error) {
  //     dispatch({
  //       type: PRODUCTS_DETAILS_FAIL,
  //       payload: error.response.data.message,
  //     });
  //   }
  // };


//   export const getProductDetails = (id) =>
//   async (dispatch) => {
//     try {
//       dispatch({ type: ALL_PRODUCTS_DETAILS_REQUEST });
// // we just add id with this URL
//       const  { data } = await axios.get(`http://localhost:5000/api/v1/product/${id}`);
//       dispatch({
//         type: ALL_PRODUCTS_DETAILS_SUCCESS,
//         payload: data.getSingleProduct,
//       });
//     } catch (error) {
//       dispatch({
//         type: ALL_PRODUCTS_DETAILS_FAIL,
//         payload: error.response.data.message,
//       });
//     }
//   };



// for the purpose of Null error
export const clrAllErrs = () => async (dispatch) =>{
    dispatch({
        type : CLEAR_ERRORS,
    });
} 








// export const getProduct = () => async(dispatch) =>{
// try {
//     dispatch({
//         type : ALL_PRODUCTS_REQUEST,
//     });
// const { data }  = await axios.get('/api/v1/products');
// // when we will get data
// dispatch({
//     type : ALL_PRODUCTS_SUCCESS,
//     payload : data,

// });
// } catch (error) {
//     dispatch({
// // when error occur then type will be fail
//         type : ALL_PRODUCTS_FAIL,
//         payload : error.response.data.message,
//     });
// }
// }
// // Clearing error
// export const clearErr = () => async(dispatch) =>{
// dispatch({
//     type :CLEAR_ERRORS,
// })

// }