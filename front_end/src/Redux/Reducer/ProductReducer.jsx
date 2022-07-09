// in state we will products initial empty array
import {ALL_PRODUCTS_FAIL,ALL_PRODUCTS_REQUEST,ALL_PRODUCTS_SUCCESS, CLEAR_ERRORS,
  PRODUCTS_DETAILS_FAIL
  ,PRODUCTS_DETAILS_SUCCESS,
  PRODUCTS_DETAILS_REQUEST,
  
} from "../Constants/productConstant"

export const ProductReducer = (state = {products : []}, action ) =>{
  switch(action.type){
      case ALL_PRODUCTS_REQUEST:
          return{
             loading : true,
            products : [],
          }
        case ALL_PRODUCTS_SUCCESS:
            return{
              loading : false,
              products : action.payload.products,
              productCount : action.payload.productCount,
              resultPerPage : action.payload.resultPerPage,
            }
        case ALL_PRODUCTS_FAIL:
                return{
                  loading : false,
                  error : action.payload,
                }
        case CLEAR_ERRORS:
                return{
                    ...state,
                    error : null,
                };
  default:
      return state;
        }
    
}                 

// export const ProductDetailsReducer = (state = {getSingleProduct : []}, action ) =>{
//   switch(action.type){
//       case PRODUCTS_DETAILS_REQUEST:
//           return{
//              loading : true,
//              getSingleProduct : [],
//           }
//         case PRODUCTS_DETAILS_SUCCESS:
//             return{
//               loading : false,
//               getSingleProduct : action.payload.getSingleProduct,
//             }
//         case PRODUCTS_DETAILS_FAIL:
//                 return{
//                   loading : false,
//                   error : action.payload,
//                 }
//         case CLEAR_ERRORS:
//                 return{
//                     ...state,
//                     error : null,
//                 };
//   default:
//       return state;
//         }
    
// }
export const ProductDetailsReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case PRODUCTS_DETAILS_REQUEST:
      return {
        loading: true,
        ...state,
      };
    case PRODUCTS_DETAILS_SUCCESS:
      return {
        loading: false,
        product: action.payload,
      };
    case PRODUCTS_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
// the purpse of clear error after alert error then remove by errpr clear
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
// export const ProductDetailsReducer = (state = {getSingleProduct : {} }, action ) =>{
//   switch(action.type){
//       case PRODUCTS_DETAILS_REQUEST:
//           return{
//              loading : true,
//             ...state,
//           };
//         case PRODUCTS_DETAILS_SUCCESS:
//             return{
//               loading : false,
//               getSingleProduct : action.payload,
//             }
//         case PRODUCTS_DETAILS_FAIL:
//                 return{
//                   loading : false,
//                   error : action.payload,
//                 }
//         case CLEAR_ERRORS:
//                 return{
//                     ...state,
//                     error : null,
//                 };
//   default:
//       return state;
//         }
    
// }   