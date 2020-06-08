import React, { Component } from "react";
import "./App.css";
import Home from "./components/home";
import UserProfile from "./components/UserProfile";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LogIn from "./components/LogIn";
import Debits from "./components/Debits";
import AccountBalance from "./components/AccountBalance";
import Credits from "./components/Credits";
import axios from "axios";

class App extends Component {
  constructor() {
    super();

    this.state = {
      debits: " ",
      credits: " ",
      currentUser: {
        userName: "bob_loblaw",
        memberSince: "08/23/99"
      }
    };
  }

  componentDidMount() {
    axios.get("https://moj-api.herokuapp.com/credits").then(res => {
      const credits = res.data;
      let creditAmount = 0;
      for (let i = 0; i < credits.length; i++) {
        creditAmount += credits[i].amount;
      }
      this.setState({ credits: creditAmount });
    });

    axios.get("https://moj-api.herokuapp.com/debits").then(res => {
      const debits = res.data;
      let debitAmount = 0;
      for (let i = 0; i < debits.length; i++) {
        debitAmount += debits[i].amount;
      }
      this.setState({ debits: debitAmount });
    });
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
        <AccountBalance
          accountBalance={this.state.debits - this.state.credits}
        />
        <Debits accountBalance={this.state.debits - this.state.credits} />
      </>
    );

    const creditComponent = () => (
      <>
        <AccountBalance
          accountBalance={this.state.debits - this.state.credits}
        />
        <Credits />
      </>
    );

    const HomeComponent = () => (
      <Home accountBalance={this.state.debits - this.state.credits} />
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
