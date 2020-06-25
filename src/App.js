import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import BookingPage from './pages/Bookings';
import EventsPage from './pages/Events';
import MainNavigation from './components/navigation/MainNavigation';
import AuthContext from './context/auth-context';

import './App.css';


class App extends Component {
  state = {
    token: null,
    userId: null
  };

  login = (token, userId, tokenExpiration) => {
    this.setState({ token: token, userId: userId });
  };

  logout = () => {
    this.setState({ token: null, userId: null });
  };

  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <AuthContext.Provider
            value={{
              token: this.state.token,
              userId: this.state.userId,
              login: this.login,
              logout: this.logout
            }}
          >
            <MainNavigation />
            <main className="main-wrapper">
              <Switch>
                {this.state.token && <Redirect from="/" to="/events" exact />}
                {this.state.token && <Redirect from="/login" to="/events" exact />}
                {!this.state.token && (
                  <Route path="/login" component={LoginPage} />
                )}
                {!this.state.token && (
                  <Route path="/register" component={RegisterPage} />
                )}
                <Route path="/events" component={EventsPage} />
                {!this.state.token && <Redirect to="/login" exact />}
                {this.state.token && (
                  <Route path="/bookings" component={BookingPage} />
                )}
              </Switch>
            </main>
          </AuthContext.Provider>
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default App;