import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../logo.png'

import AuthContext from '../../context/auth-context';
import './MainNavigation.css';

const mainNavigation = props => (
  <AuthContext.Consumer>
    {context => {
      return (
        <header className="main-navigation">
            <div className="main-navigation__logo">
                <img src={logo} className="beatgig-logo" alt="logo" />
            </div>
          <nav className="main-navigation__items">
            <ul>
              {!context.token && (
                <li>
                  <NavLink to="/login">Login</NavLink>
                </li>
              )}
                {!context.token && (
                <li>
                  <NavLink to="/register">Register</NavLink>
                </li>
              )}
              <li>
                <NavLink to="/events">Events</NavLink>
              </li>
              {context.token && (
                <React.Fragment>
                <li>
                  <NavLink to="/bookings">Bookings</NavLink>
                </li>
                <li>
                    <button onClick={context.logout}>Logout</button>
                </li>
                </React.Fragment>
              )}
            </ul>
          </nav>
        </header>
      );
    }}
  </AuthContext.Consumer>
);

export default mainNavigation;