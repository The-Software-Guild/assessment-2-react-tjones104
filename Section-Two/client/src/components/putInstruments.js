import axios from "axios";
import React, { Component } from "react";
import GetInstruments from "./getInstruments";

class PutInstruments extends Component {
  constructor() {
    super();
    this.state = {
      id: "",
      name: "",
      series: "",
      digital: false,
      colors: [],
      price: 0.01,
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
  //   fetch("http://localhost:8080/api/itemsIntake/" + this.state.id, {
  //     method: "PUT",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(this.state),
  //   })
  //     .then((res) => {
  //       if (res.status === 201) {
  //         alert("Succuss: Item updated");
  //         window.location.reload(false);
  //       } else {
  //         alert("Error: This Id was not found");
  //       }
  //     })
  //     .catch((error) => {
  //       alert("Error: Could not update");
  //     });
  // };

  handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:8080/api/itemsIntake/${this.state.id}`, this.state)
      .then((res) => {
        if (res.status === 201) {
          alert("Succuss: Item updated");
          window.location.reload(false);
        } else {
          alert("Error: This Id was not found");
        }
      })
      .catch((error) => {
        alert("Error: Could not update");
      });
  };

  render() {
    return (
      <div className="put-item">
        <div>
          <h2>Update a Piano</h2>
          <form onSubmit={this.handleSubmit}>
            <label>Id:</label>
            <input
              type="text"
              name="id"
              value={this.state.id}
              minLength="36"
              maxLength="36"
              onChange={this.handleChange}
              required
            />
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
            <span className="checkmark" required>
              <input
                type="checkbox"
                name="colors"
                value="black"
                required
                onChange={this.handleCheck}
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
            <button>Update Piano</button>
          </form>
        </div>
        <div>
          <GetInstruments />
        </div>
      </div>
    );
  }
}

export default PutInstruments;
