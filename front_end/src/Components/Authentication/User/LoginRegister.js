import React, { useEffect, useRef, useState } from "react";
import "./LoginRegister.css";
import { Link } from "react-router-dom";
import MarkEmailUnreadIcon from "@mui/icons-material/MarkEmailUnread";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import  {useAlert} from 'react-alert'
import  { useDispatch,useSelector} from 'react-redux';
import { login,clrAllErrs,register } from "../../../Redux/Actions/UserActions"
import Loader from "../../layout/Loader/Loader";


const LoginRegister = ({history}) => {
  const  {error,loading ,isAuthenticated} = useSelector(state => state.user);
  const dispatch = useDispatch();
  const alert = useAlert();
  // useRef => we can't access DOM Element without useRef in Js=> doc.quesryselector
  const loginTab = useRef(null);
  const registerTab = useRef(null);
  const switcherTab = useRef(null);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [User, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
//  =============================Registration===================== 
  const { name, email, password } = User;
  const [avatar, setAvatar] = useState();
  const [avatarPreview, setAvatarPreview] = useState("/Profile.png");

  const loginSubmit = (e) => {
    e.preventDefault();
    console.log("Login Submit");
    dispatch(login(loginEmail,loginPassword));
  };
  const registerSubmit = (e) => {
    e.preventDefault();
    const myform = new FormData();
    myform.set("name", name);
    myform.set("email", email);
    myform.set("password", password);
    // myform.set("avatar", avatar);
    dispatch(register(myform));
  };

  const registerDataChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();
      reader.onload = () => {
        // 3 state 0,1,2 0=initial , 1=proceessing, 2=done
        if (reader.readyState === 2) {
          // photo upload then set in preview so that show
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
        reader.readAsDataURL(e.target.files[0]);
      };
    } else {
      // ...User = >  user , replace name : "Imran", email : "Imran@123gmail"
      setUser({ ...User, [e.target.name]: e.target.value });
    }
  };

  useEffect(()=>{
    if(error){
      alert.error(error);
      dispatch(clrAllErrs())
    }
    if(isAuthenticated){
      history.push('/');
    }
  },[dispatch,error,alert,history]);

  // tab = "Login" or "register parameter"
  // for Left to right swep tab
  const switchTab = (e, tab) => {
    if (tab === "login") {
      switcherTab.current.classList.add("shiftToNeutral");
      switcherTab.current.classList.remove("shiftToRight");

      registerTab.current.classList.remove("shiftToNeutralForm");
      loginTab.current.classList.remove("shiftToLeft");
    }
    if (tab === "register") {
      switcherTab.current.classList.add("shiftToRight");
      switcherTab.current.classList.remove("shiftToNeutral");

      registerTab.current.classList.add("shiftToNeutralForm");
      loginTab.current.classList.add("shiftToLeft");
    }
  };

  return (
    <>
      {loading ? <Loader /> :
      <>
      <div className="AuthContainer">
{/* =============================Login===================== */}
        <div className="LoginSignUp">
          <div>
            <div className="login_Signup-Toggle">
              <p onClick={(e) => switchTab(e, "login")}>LOGIN</p>
              <p onClick={(e) => switchTab(e, "register")}>REGISTER</p>
            </div>
            <button ref={switcherTab}></button>
          </div>
          <form className="loginform" ref={loginTab} onSubmit={loginSubmit}>
            <div className="loginEmail">
              <MarkEmailUnreadIcon />
              <input
                type="email"
                placeholder="Email"
                required
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
              />
            </div>
            <div className="loginPassword">
              <LockOpenIcon />
              <input
                type="password"
                placeholder="Password"
                required
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
              />
            </div>
            <Link to="/password/forgot">Forget Password ?</Link>
            <input type="submit" value="Login" className="loginBtn" />
          </form>

{/* =============================Registration===================== */}
          <form
            className="signUpForm"
            ref={registerTab}
            // for multilple data image as well
            encType="multipart/form-data"
            onSubmit={registerSubmit}
          >
            <div className="signUpName">
              <ShoppingCartIcon />
              <input
                type="text"
                placeholder="Name"
                required
                name="name"
                value={name}
                onChange={registerDataChange}
              />
            </div>
            <div className="signUpEmail">
              <MarkEmailUnreadIcon />
              <input
                type="email"
                placeholder="Email"
                required
                name="email"
                value={email}
                onChange={registerDataChange}
              />
            </div>
            <div className="signUpPassword">
              <LockOpenIcon />
              <input
                type="password"
                placeholder="Password"
                required
                name="password"
                value={password}
                onChange={registerDataChange}
              />
            </div>

            <div id="registerImage">
              <img src={avatarPreview} alt="Avatar Preview" />
              <input
                type="file"
                name="avatar"
                accept="image/*" //all image *
                onChange={registerDataChange}
              />
            </div>
            <input type="submit" value="Register" className="signUpBtn" />
          </form>
        </div>
      </div>
      </>}
    </>
  );
};

export default LoginRegister;
