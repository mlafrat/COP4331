import user from './user.png';
import inbox from './envelope.png';
import logout from './log-out.png';
import knightro from './knightro.png';
import './Dropdown.css';
import React, {useState, useEffect, useRef} from 'react';
import {Link} from 'react-router-dom';


function Dropdown() {

  // Ensure dropdown is closed until moused over.
  const [open, setOpen] = useState(false);

  let dropRef = useRef();

  useEffect(() => {
    let handler = (e)=>{
      if(!dropRef.current.contains(e.target)){
        setOpen(false);
        console.log(dropRef.current);
      }      
    };

    // Added event listening functions to show mouse as a pointer when it's on the user's photo.
    document.addEventListener("mousedown", handler);
    

    return() =>{
      document.removeEventListener("mousedown", handler);
    }

  });

  // Shows each menu dropdown item with icons when the dropdown is open.
  // User's photo is also shown initially on menu button.
  return (
    <div className="Dropdown">
      <div className='menu-container' ref={dropRef}>
        <div className='menu-trigger' onClick={()=>{setOpen(!open)}}>
          <img src={knightro} alt="default avatar"></img>
        </div>

        <div className={`dropdown-menu ${open? 'active' : 'inactive'}`} >
          <h3>Knightro<br/></h3>
          <ul>
            <li className='dropdownItem'>
              <Link to="/profile-settings">
                <img src={user} alt="Profile Settings" />
                Profile Settings
              </Link>
            </li>
            <li className='dropdownItem'>
              <Link to="/my-reviews">
                <img src={inbox} alt="My Reviews" />
                My Reviews
              </Link>
            </li>
            <li className='dropdownItem'>
              <Link to="/found-microwave">
                <img src={inbox} alt="Found a Microwave?" />
                Found a Microwave?
              </Link>
            </li>
            <DropdownItem img = {logout} text = {"Logout"}/>
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
      <img src={props.img} alt="profile avatar"></img>
      <txt> {props.text} </txt>
    </li>
  );
}

export default Dropdown;