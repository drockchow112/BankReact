import React, { Component } from "react";
import axios from "axios";

class Debits extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [], accountBalance: this.props.accountBalance};
    this.handleChange = this.handleChange.bind(this);
    this.addDebit = this.addDebit.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  addDebit() {
    let newData = this.state.data;
    newData.push({
      ID: "",
      description: this.state.description,
      amount: this.state.amount
    });
    this.setState({ data: newData });
  }

  componentDidMount() {
    axios.get("https://moj-api.herokuapp.com/debits").then(res => {
      const debits = res.data;
      this.setState({ data: debits });
    });
  }

  render() {
    const data = this.state.data;
    console.log(data);

    const debitDivs = data.map(obj => (
      <div>
        <div>ID: {obj.id}</div>
        <div>Desciption: {obj.description}</div>
        <div>Amount: {obj.amount}</div>
      </div>
    ));

    return (
      <>
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
