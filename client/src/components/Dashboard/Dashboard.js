import React from 'react';
//import portrait from './knightro.jpg'
import './Dashboard.css'

export default function Dashboard() {
  return(
    <div className="Dashboard">
      <div className = 'menu-container'>
        <div className = 'menu-trigger'>
          <img></img>
        </div>

        <div className='dropdown-menu'>
          <h3>Knightro<br/><span>UCF Mascot</span></h3>
          <ul>
            <DropdownItem/>
            <DropdownItem/>
            <DropdownItem/>
            <DropdownItem/>
          </ul>
        </div>
      </div>
    </div>
      
  );
}

function DropdownItem(props){
  return(
    <li className = 'dropdownItem'>
      <img></img>
      <a></a>
    </li>
  );
}

