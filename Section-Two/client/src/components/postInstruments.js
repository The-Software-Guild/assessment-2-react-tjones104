import React, { Component } from "react";
import GetInstruments from "./getInstruments";
import axios from "axios";

class PostInstruments extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      series: "",
      digital: false,
      colors: [],
      price: 0.1,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleCheck(e) {
    let newArray = [...this.state.colors, e.target.value];
    if (this.state.colors.includes(e.target.value)) {
      newArray = newArray.filter((color) => color !== e.target.value);
    }
    this.setState({
      colors: newArray,
    });
  }

  // handleSubmit = (e) => {
  //   e.preventDefault();
  //   fetch("http://localhost:8080/api/itemsIntake", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(this.state),
  //   })
  //     .then(() => {
  //       console.log(this.state);
  //       alert("Succuss: Item added");
  //       //window.location.reload(false);
  //     })
  //     .catch((error) => {
  //       alert("Error: Could not post");
  //     });
  // };

  handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8080/api/itemsIntake", this.state)
      .then((res) => {
        alert("Succuss: Item added");
        window.location.reload(false);
      })
      .catch((error) => {
        alert("Error: Could not post");
      });
  };

  render() {
    return (
      <div className="post-item">
        <h2>Add a new Piano</h2>
        <form className="post-form" onSubmit={this.handleSubmit}>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.handleChange}
            required
          />
          <label>Series:</label>
          <input
            type="text"
            name="series"
            value={this.state.series}
            onChange={this.handleChange}
            required
          />
          <label>Digital:</label>
          <select
            value={this.state.digital}
            name="digital"
            onChange={this.handleChange}
          >
            <option value="true">true</option>
            <option value="false">false</option>
          </select>
          <label>Colors:</label>
          <span className="checkmark">
            <input
              type="checkbox"
              name="colors"
              value="black"
              onChange={this.handleCheck}
              required
            />
            <label>Black</label>
            <input
              type="checkbox"
              name="colors"
              value="grey"
              onChange={this.handleCheck}
            />
            <label>Grey</label>
            <input
              type="checkbox"
              name="colors"
              value="brown"
              onChange={this.handleCheck}
            />
            <label>Brown</label>
            <input
              type="checkbox"
              name="colors"
              value="white"
              onChange={this.handleCheck}
            />
            <label>White</label>
          </span>
          <label>Price:</label>
          <input
            type="number"
            name="price"
            value={this.state.price}
            min="0"
            step="0.01"
            onChange={this.handleChange}
            required
          />
          <button>Add Piano</button>
        </form>
        <div>
          <GetInstruments />
        </div>
      </div>
    );
  }
}

export default PostInstruments;
