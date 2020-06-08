import React, { Component } from "react";
import "./App.css";
import Home from "./components/home";
import UserProfile from "./components/UserProfile";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LogIn from "./components/LogIn";
import Debits from "./components/Debits";
import AccountBalance from "./components/AccountBalance";
import Credits from "./components/Credits";

class App extends Component {
  constructor() {
    super();

    this.state = {
      accountBalance: 14568.27,
      currentUser: {
        userName: "bob_loblaw",
        memberSince: "08/23/99"
      }
    };
  }

  mockLogIn = logInInfo => {
    const newUser = { ...this.state.currentUser };
    newUser.userName = logInInfo.userName;
    this.setState({ currentUser: newUser });
  };

  render() {
    const LogInComponent = () => (
      <LogIn
        user={this.state.currentUser}
        mockLogIn={this.mockLogIn}
        {...this.props}
      />
    );

    const debitComponent = () => (
      <>
        <AccountBalance accountBalance={this.state.accountBalance} />
        <Debits debit={2} />
      </>
    );

    const creditComponent = () => (
      <>
        <AccountBalance accountBalance={this.state.accountBalance} />
        <Credits />
      </>
    );

    const HomeComponent = () => (
      <Home accountBalance={this.state.accountBalance} />
    );
    const UserProfileComponent = () => (
      <UserProfile
        userName={this.state.currentUser.userName}
        memberSince={this.state.currentUser.userName}
      />
    );

    return (
      <Router>
        <Switch>
          <Route exact path="/" render={HomeComponent} />
          <Route exact path="/userProfile" render={UserProfileComponent} />
          <Route exact path="/login" render={LogInComponent} />
          <Route exact path="/debits" render={debitComponent} />
          <Route exact path="/credits" render={creditComponent} />
        </Switch>
      </Router>
    );
  }
}

export default App;
