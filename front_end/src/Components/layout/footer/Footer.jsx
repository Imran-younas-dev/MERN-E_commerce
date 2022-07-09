import React from 'react'
import playStore from "../../../Assets/playstore.png";
import AppStore from "../../../Assets/Appstore.png";
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GoogleIcon from '@mui/icons-material/Google';
import YouTubeIcon from '@mui/icons-material/YouTube';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import './Footer.css'
const Footer = () => {
  return (
         <>
   <footer id='footer'>
       <div className='left'>
           <h4>Download Our App</h4>
           <p>Download Our app for Android and IOS Monile App</p>
           <img src ={playStore} alt="playstore" />
           <img src ={AppStore} alt="Appstore" />
       </div>
       <div className='center'>
           <h1>IK-E-SHOP</h1>
           <a href="#"><AddLocationAltIcon color = "warning" sx={{ fontSize: 30 }}/><span>Gulshan-E-Maymar, Karachi</span></a> 
           <p>Copyright 2022 &copy; Imran_Younas</p>
       </div>
       <div className='right'>
           <h4>Connect with US on our Social Media</h4>
           <a href="#"><FacebookIcon color='primary' sx={{ fontSize: 30 }}/><span>Facebook</span></a>
           <a href="#"><InstagramIcon color='warning'sx={{ fontSize: 30 }} /><span>Instagram</span></a>
           <a href="#"><LinkedInIcon color='primary' sx={{ fontSize: 30 }} /><span>LinkedIn</span></a>
           <a href="#"><YouTubeIcon color='error' sx={{ fontSize: 30 }} /><span>YouTube</span></a>
           <a href="#"><GoogleIcon color='error' sx={{ fontSize: 30 }} /><span>Google</span></a>
       </div>
   </footer>
        </>
    )
}

export default Footer