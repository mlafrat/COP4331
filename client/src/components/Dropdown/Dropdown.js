import user from './user.png';
import edit from './edit.png';
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
        <div className='menu-trigger' onClick={() => setOpen(!open)}>
          <img src={knightro} alt="User Avatar" />
        </div>

        <div className={`dropdown-menu ${open ? 'active' : 'inactive'}`}>
          <h3>Knightro<br/></h3>
          <ul>
            <DropdownItem img = {user} text = {"Profile Settings"}/>
            <DropdownItem img = {edit} text = {"My Reviews"}/>
            <DropdownItem img = {inbox} text = {"Found a Microwave?"}/>
            <li className='dropdownItem'>
              <Link to="/login">
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
      <txt> {props.text} </txt>
    </li>
  );
}

export default Dropdown;