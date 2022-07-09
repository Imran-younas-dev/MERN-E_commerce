import React from "react";
import { Link } from "react-router-dom";
import {Stack} from "@mui/material"
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SearchIcon from '@mui/icons-material/Search';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import './Header.css';
const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-white bg-white shadow-lg p-4">
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-4 ">
            <li className="nav-item"><Link className="nav-link text-dark logo" to="/">IK-E-Shop</Link></li>
            <li className="nav-item"><Link className="nav-link text-dark ml-3" to="/">Home</Link></li>
            <li className="nav-item"><Link className=" nav-link text-dark" to="/products">Products</Link></li>
            <li className="nav-item"><Link className="nav-link text-dark" to="/update">Contact</Link></li>
            <li className="nav-item"><Link className="nav-link text-dark" to="/profile">About</Link></li>
            <div className="icons">
            <div class="input-group rounded">
              <input type="search" class="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
              <span class="input-group-text border-0" id="search-addon">
              <SearchIcon />
              </span>
              </div>
              
            {/* <li className="nav-item "><Link className="nav-link text-dark" to="/cart"><Search ?.</Link></li> */}
            <li className="nav-item "><Link className="nav-link text-dark" to="/cart"><Stack >< ShoppingCartIcon  sx={{ fontSize: 30 }}/></Stack></Link></li>
            <li className="nav-item "><Link className="nav-link text-dark" to="/login"><Stack ><  AssignmentIndIcon  sx={{ fontSize: 30 }}/></Stack></Link></li>
            <li className="nav-item "><Link className="nav-link text-dark" to="/cart"><Stack >< NotificationsIcon  sx={{ fontSize: 30 }}/></Stack></Link></li>
            </div>
          </ul>            
        </div>
      </nav>
  );
};

export default Header;
