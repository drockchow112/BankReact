import React, { Component } from "react";
import axios from "axios";

class Credits extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
  }

  componentDidMount() {
    axios.get("https://moj-api.herokuapp.com/credits").then(res => {
      const credits = res.data;
      this.setState({ data: credits });
    });
  }

  render() {
    const data = this.state.data;

    const creditDivs = data.map(obj => (
      <div>
        <div>ID: {obj.id}</div>
        <div>Desciption: {obj.description}</div>
        <div>Amount: {obj.amount}</div>
      </div>
    ));
    return (
      <>
        <h1>Credits</h1>
        <div>{creditDivs}</div>
      </>
    );
  }
}

export default Credits;
