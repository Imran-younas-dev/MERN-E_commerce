import React from "react";
import { Svg } from "./Svg";
const Navbar = () => {
  const style = {
    "nav-text": "px-4 py-3 font-weight-bold rounded-lg cursor-pointer mx-2 text-primary",
  };
  return (
    <>
      <nav className="fixed top-0 w-full z-10 shadow-lg lg:shadow-none bg-blue-200 ">
        <div className="m-4 md:mx-12 md:my-6 grid grid-cols-4 lg:grid-cols-3">
          <div className="hidden lg:block col-span-1 flex text-gray-600 mt-1 ">
            <span className={style["nav-text"]}>Shop</span>
            <span className={style["nav-text"]}>Blog</span>
            <span className={style["nav-text"]}>Contact Us</span>
          </div>
          {/* for responsive => div toggle or tittle */}
          <div className="col-span-2 lg:hidden flex justify-items-stretch items-center ">
            <Svg d="M4 6h16M4 18h16" />
            {/* for responsive title of e-commerce */}
            <span
              style={{ letterSpacing: "0.10rem" }}
              className="font-bold uppercase text-gray-800 text-2xl cursor-pointer px-2"
            >
              IK-Shop
            </span>
          </div>
          {/* for responsive =>End div toggle or tittle */}
          {/* div full screen title */}
          <div
            style={{ letterSpacing: "0.70rem" }}
            className="text-center font-bold text-secondary  uppercase text-2xl cursor-pointer"
          >
            ik-shop
          </div>
          {/* div end full screen title*/}
          <div className="flex items-right col-span-2 lg:col-span-1 flex justify-end">
            {/* Heart icon */}
            <div
              className="hover:bg-gray-200 rounded-lg px-2 py-2 cursor-pointer"
              title="Wishlist"
            >
              <Svg d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </div>
            {/* Heart icon */}
            <div
              className="userDropdownBtn hover:bg-gray-200 px-2 py-2 rounded-lg relative"
              title="logout"
            >
              <Svg d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />

              <div className="userDropdown absolute right-0 mt-1 bg-gray-200 rounded">
                <>
                  <li className="flex flex-col text-gray-700 w-48 shadow-lg ">
                    <span className="flex space-x-2 py-2 px-8 hover:bg-gray-400 cursor-pointer">
                      {/* code... */}
                      <span>
                        <Svg d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </span>
                      <span>My Order</span>
                    </span>

                    <span className="flex space-x-2 py-2 px-8 hover:bg-gray-400 cursor-pointer">
                      {/* code... */}
                      <span>
                        <Svg d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </span>
                      <span>My Account</span>
                    </span>


                    <span className="flex space-x-2 py-2 px-8 hover:bg-gray-400 cursor-pointer">
                      {/* code... */}
                      <span>
                        <Svg d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </span>
                      <span>My WishList</span>
                    </span>

            
                    <span className="flex space-x-2 py-2 px-8 hover:bg-gray-400 cursor-pointer">
                      {/* code... */}
                      <span>
                        <Svg
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          d2="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                        />
                      </span>
                      <span>Settings</span>
                    </span>
                    <span className="flex space-x-2 py-2 px-8 hover:bg-gray-400 cursor-pointer">
                      {/* code... */}
                      <span>
                        <Svg d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </span>
                      <span>Logout</span>
                    </span>
                  </li>
                </>
              </div>
            </div>
               <div
                className="cursor-pointer hover:bg-gray-200 px-2 py-2 rounded-lg"
                title="Login"
              >
   <Svg d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
               </div> 
{/* Cart Modal Button */}
                <div
              className="hover:bg-gray-200 px-2 py-2 rounded-lg relative cursor-pointer"
              title="Cart"
                >
   <Svg d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />

                </div>
          </div>
        </div>
      </nav>
    </>
  );
};
export default Navbar;
