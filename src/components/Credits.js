import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import AccountBalance from "./AccountBalance";
import "./cssFiles/credits.css";

class Credits extends Component {
  constructor(props) {
    super(props);
    this.state = { data: this.props.creditData };
    this.handleChange = this.handleChange.bind(this);

    this.addCredit = this.addCredit.bind(this);
  }

  handleChange(e) {
    if (e.target.name === "amount") {
      console.log("Called me?");
      this.setState({
        [e.target.name]: this.state.amount + parseFloat(e.target.value) // if the target name is amount then set parseInt.
      });
    }

    this.setState({
      [e.target.name]: e.target.value
    });
  }

  componentDidMount() {
    axios.get("https://moj-api.herokuapp.com/credits").then(res => {
      const credits = res.data;
      this.setState({ data: credits });
    });
  }

  addCredit() {
    let newData = this.state.data;
    let obj = {
      ID: "",
      description: this.state.description,
      amount: this.state.amount
    };
    this.setState({ data: newData });
    this.props.handler(this.state.amount, obj);
  }

  render() {
    const data = this.props.creditData;

    const creditDivs = data.map((obj, index) => {
      return index < 10 ? (
        <div>
          <div>ID: {obj.id}</div>
          <div>Desciption: {obj.description}</div>
          <div>Amount: {obj.amount}</div>
        </div>
      ) : (
        <div>
          <div>Desciption: {obj.description}</div>
          <div>Amount: {obj.amount}</div>
        </div>
      );
    });
    return (
      <>
        <div className="firstCredit">
          <AccountBalance accountBalance={this.props.accountBalance} />
          <Link to="/">Back to Home</Link>

          <input type="text" name="description" onChange={this.handleChange} />
          <input type="number" name="amount" onChange={this.handleChange} />
          <button onClick={this.addCredit}> Add Credits </button>
          <h1>Credits</h1>
        </div>
        <div className="allCredits">{creditDivs}</div>
      </>
    );
  }
}

export default Credits;
