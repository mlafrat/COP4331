import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import user from './user.png';
import star from './star.png'
import microwave from './microwave.png';
import logout from './logout.png';
import knightro from './knightro.png';
import home from './home.png';
import './Dropdown.css';
import Cookies from 'js-cookie';

function Dropdown() {
  const [open, setOpen] = useState(false);
  const dropRef = useRef();
  const location = useLocation();

  useEffect(() => {
    let handler = (e) => {
      if (!dropRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  const handleLogout = () => {
    // Remove the user cookie when logging out
    Cookies.remove('user');
  };

  // Retrieve user data from cookie
  const userData = Cookies.get('user') ? JSON.parse(Cookies.get('user')) : null;
  const userName = userData ? userData.username : '';
  const loginMethod = userData ? userData.loginMethod : ''; // Added loginMethod check

  // Determine the profile image based on the login method
  let profileImage;
  if (loginMethod !== 'local' && userData?.googleProfileImage) {
    // Use the Google profile image if available
    profileImage = userData.googleProfileImage;
  } else if (userData?.profilePicUrl) {
    // Use the uploaded profile picture if available
    profileImage = userData.profilePicUrl;
  } else {
    // Use the default image for other login methods
    profileImage = knightro;
  }

  return (
      <div className="Dropdown">
        <div className='menu-container' ref={dropRef}>
          <div className='menu-trigger' onClick={() => setOpen(!open)}>
            <img src={profileImage} alt="User Avatar" />
          </div>
          <div className={`dropdown-menu ${open ? 'active' : 'inactive'}`} >
            <h3>Welcome, {userName}!<br /></h3>
            <ul>
              {!(location.pathname === "/dashboard") && (
                  <li className='dropdownItem'>
                    <Link to="/dashboard">
                      <img src={home} alt="Return to Home" />
                      Home
                    </Link>
                  </li>
              )}
              {loginMethod === 'local' && ( // Conditionally render based on login method
                  <li className='dropdownItem'>
                    <Link to="/profile-settings">
                      <img src={user} alt="Profile Settings" />
                      Profile Settings
                    </Link>
                  </li>
              )}
              <li className='dropdownItem'>
                <Link to="/my-reviews">
                  <img src={star} alt="My Reviews" />
                  My Reviews
                </Link>
              </li>
              <li className='dropdownItem'>
                <Link to="/found-microwave">
                  <img src={microwave} alt="Found a Microwave?" />
                  Found a Microwave?
                </Link>
              </li>
              <li className='dropdownItem'>
                <Link to="/login" onClick={handleLogout}>
                  <img src={logout} alt="Logout" />
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
  );
}

export default Dropdown;