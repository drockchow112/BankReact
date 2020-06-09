import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

class Debits extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.debitData,
      description: "",
      amount: 0
    };

    this.handleChange = this.handleChange.bind(this);
    this.addDebit = this.addDebit.bind(this);
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

  addDebit() {
    let newData = this.props.debitData;
    let obj = {
      ID: "",
      description: this.state.description,
      amount: this.state.amount
    };
    this.setState({ data: newData });
    this.props.handler(this.state.amount, obj);
  }

  componentDidMount() {
    axios.get("https://moj-api.herokuapp.com/debits").then(res => {
      const debits = res.data;
      this.setState({ data: debits });
    });
  }

  render() {
    const data = this.props.debitData;

    const debitDivs = data.map((obj, index) => {
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
        <Link to="/">Back to Home</Link>
        <input type="text" name="description" onChange={this.handleChange} />
        <input type="number" name="amount" onChange={this.handleChange} />
        <button onClick={this.addDebit}> Add Debit </button>
        <h1>Debits</h1>
        <div>{debitDivs}</div>
      </>
    );
  }
}

export default Debits;
