import './app.css';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Header from "./Components/layout/Header/Header"
import Footer from "./Components/layout/footer/Footer";
import Home from "./Components/Home/Home.js"
import ProductDetails from "./Components/Product/ProductDetails.js"
import AllProducts from "./Components/Product/AllProducts"
import LoginRegister from "./Components/Authentication/User/LoginRegister"
import store from './Store'
import { loadUser } from './Redux/Actions/UserActions';
function App() {
  // method to use dispatch  2nd
  // use this for apply user over appliaction
  store.dispatch(loadUser());
  
  return (
    <Router>
    <Header />
    <Route exact path="/" component={Home}/>
    <Route exact path="/product/:id" component={ProductDetails}/>
    <Route exact path="/products" component={AllProducts}/>
    <Route exact path="/login" component={LoginRegister}/>
    <Footer />
  </Router>
  );
}
export default App;
