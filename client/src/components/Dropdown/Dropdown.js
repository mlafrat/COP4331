import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import user from './user.png';
import edit from './edit.png';
import inbox from './envelope.png';
import logout from './log-out.png';
import knightro from './knightro.png';
import './Dropdown.css';
import Cookies from 'js-cookie'; // Import js-cookie

function Dropdown() {
  const [open, setOpen] = useState(false);
  const dropRef = useRef();

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

  return (
      <div className="Dropdown">
        <div className='menu-container' ref={dropRef}>
          <div className='menu-trigger' onClick={() => setOpen(!open)}>
            <img src={knightro} alt="User Avatar" />
          </div>

          <div className={`dropdown-menu ${open ? 'active' : 'inactive'}`} >
            <h3>{userName}<br /></h3>
            <ul>
              <DropdownItem img={user} text={"Profile Settings"} />
              <DropdownItem img={edit} text={"My Reviews"} />
              <DropdownItem img={inbox} text={"Found a Microwave?"} />
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

// Shows properties of each item in their formatting order using a list.
function DropdownItem(props){
  return(
      <li className = 'dropdownItem'>
        <img src={props.img} alt={props.img}></img>
        <div> {props.text} </div>
      </li>
  );
}

export default Dropdown;
