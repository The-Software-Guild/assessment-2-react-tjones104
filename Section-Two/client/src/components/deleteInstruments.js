import React, { Component } from "react";
import GetInstruments from "./getInstruments";
import axios from "axios";

class DeleteInstruments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  // handleSubmit = (e) => {
  //   e.preventDefault();
  //   fetch("http://localhost:8080/api/itemsIntake/" + this.state.id, {
  //     method: "DELETE",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(this.state),
  //   })
  //     .then((res) => {
  //       if (res.status === 201) {
  //         alert("Succuss: Item deleted");
  //         window.location.reload(false);
  //       } else {
  //         alert("Error: This Id was not found");
  //       }
  //     })
  //     .catch((error) => {
  //       alert("Error: Could not delete");
  //     });
  // };

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.props.id);
    axios
      .delete(`http://localhost:8080/api/itemsIntake/${this.props.id}`)
      .then((res) => {
        if (res.status === 201) {
          alert("Succuss: Item deleted");
          window.location.reload(false);
        } else {
          alert("Error: This Id was not found");
        }
      })
      .catch((error) => {
        alert("Error: Could not delete");
      });
  };

  render() {
    return (
      <div className="delete-item">
        <div>
          <h2>Delete a Piano</h2>
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
            <button>Delete Piano</button>
          </form>
        </div>
        <div>
          <GetInstruments />
        </div>
      </div>
    );
  }

  // render() {
  //   return (
  //     <button className="delete-button" onClick={this.handleSubmit}>
  //       Delete
  //     </button>
  //   );
  // }
}

export default DeleteInstruments;
