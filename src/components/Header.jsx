import React from 'react';
import { NavLink } from 'react-router-dom';

import "../styles/Header.css"

function Header({ pagesLink }) {

  return (
    <header>
      <nav>
        <ul>
          {pagesLink.map((link, index) => (
            <li key={index}>
              <NavLink to={link?.path} style={({isActive}) => {
                return { color: isActive ? "#00C5FF" : "" }
              }}>
                { link?.text ? link.text : "@#$&%|@" }
              </NavLink>
            </li>
          ))} 
        </ul>
      </nav>
    </header>
  );
};

export default Header;