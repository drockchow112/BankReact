import React, { Component } from "react";
import AccountBalance from "./AccountBalance";
import { NavLink } from "react-router-dom";
import "./cssFiles/homepage.css";

class Home extends Component {
  render() {
    return (
      <div className="homepage">
        <h1>Bank of React</h1>
        <AccountBalance accountBalance={this.props.accountBalance} />
        <div className="links">
          <NavLink to="/userProfile">User Profile</NavLink>
          <NavLink to="/debits">Debits</NavLink>
          <NavLink to="/credits">Credits</NavLink>
          <NavLink to="/login">Log In</NavLink>
        </div>
      </div>
    );
  }
}

export default Home;
