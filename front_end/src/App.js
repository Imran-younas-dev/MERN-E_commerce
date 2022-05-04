import './app.css';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Header from "./Components/layout/Header/Header"
import Footer from "./Components/layout/footer/Footer";
import Home from "./Components/Home/Home.js"
function App() {
  return (
    <Router>
    <Header />
    <Route exact path="/" component={Home}/>
    <Footer />
  </Router>
  );
}
export default App;
