import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdOutlineRestaurantMenu } from "react-icons/md";

import images from "../../constants/images";

import "./Navbar.css";

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = React.useState(false);
  return (
    <nav className="app__navbar">
      <div className="app__navbar-logo">
        <img src={images.gericht} alt="app logo" />
      </div>
      <ul className="app__navbar-links">
        <li className="p__cormorant">
          <a href="#home">Home</a>{" "}
        </li>
        <li className="p__cormorant">
          <a href="#about">About</a>{" "}
        </li>
        <li className="p__cormorant">
          <a href="#menu">Menu</a>{" "}
        </li>
        <li className="p__cormorant">
          <a href="#review">Review</a>{" "}
        </li>
        <li className="p__cormorant">
          <a href="#predict">Predict Food</a>{" "}
        </li>
        <li className="p__cormorant">
          <a href="#Awards">Awards</a>{" "}
        </li>
        <li className="p__cormorant">
          <a href="#contact">Find Us</a>{" "}
        </li>
      </ul>
      <div className="app__navbar-login">
        <a href="#login" className="p__cormorant">
          Contact Us ‎{" "}
        </a>

        <div />

        <a href="/" className="p__cormorant">
          ‎Log In / Registration ‎‎
        </a>
      </div>
      <div className="app__navbar-smallscreen">
        <GiHamburgerMenu
          color="#fff"
          fontSize={27}
          onClick={() => setToggleMenu(true)}
        />

        {toggleMenu && (
          <div className="app__navbar-smallscreen_overlay flex__center slide-bottom">
            <MdOutlineRestaurantMenu
              fontSize={27}
              className="overlay_close"
              onClick={() => setToggleMenu(false)}
            />

            <ul className="app__navbar-smallscreen_links">
              <li>
                <a href="#home" onClick={() => setToggleMenu(false)}>
                  Home
                </a>
              </li>
              <li>
                <a href="#about" onClick={() => setToggleMenu(false)}>
                  About
                </a>
              </li>
              <li>
                <a href="#menu" onClick={() => setToggleMenu(false)}>
                  Menu
                </a>
              </li>
              <li>
                <a href="#review" onClick={() => setToggleMenu(false)}>
                  Review
                </a>
              </li>
              <li>
                <a href="#awards" onClick={() => setToggleMenu(false)}>
                  Awards
                </a>
              </li>
              <li>
                <a href="#contact" onClick={() => setToggleMenu(false)}>
                  Contact
                </a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
