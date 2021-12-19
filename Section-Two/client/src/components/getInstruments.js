import React, { Component } from "react";
import axios from "axios";
import DeleteInstruments from "./deleteInstruments";

class GetInstruments extends Component {
  constructor() {
    super();
    this.state = {
      instrumentItems: [],
      searchQuery: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleReset(e) {
    e.preventDefault();
    window.location.reload(false);
  }

  // componentDidMount() {
  //   fetch("http://localhost:8080/api/itemsIntake")
  //     .then((res) => res.json())
  //     .then((instrumentItems) => {
  //       this.setState({ instrumentItems });
  //     })
  //     .catch((error) => {
  //       alert("Error: Could not fetch");
  //     });
  // }

  componentDidMount() {
    axios
      .get("http://localhost:8080/api/itemsIntake")
      .then((res) => {
        const instrumentItems = res.data;
        this.setState({ instrumentItems });
      })
      .catch((error) => {
        alert("Error: Could not fetch");
      });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:8080/api/itemsIntake?" + this.state.searchQuery)
      .then((res) => res.json())
      .then((instrumentItems) => {
        this.setState({ instrumentItems });
      })
      .catch((error) => {
        alert("Error: Could not fetch query");
      });
  };

  render() {
    return (
      <div className="get-list">
        <h2>Piano List</h2>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label>Search: </label>
            <div>
              <input
                type="text"
                placeholder="Ex: series=Arius or _id=1234"
                name="searchQuery"
                value={this.state.searchQuery}
                onChange={this.handleChange}
              />
            </div>
            <div>
              <button className="search-button">Search</button>
              <button className="delete-button" onClick={this.handleReset}>
                Reset
              </button>
            </div>
          </div>
        </form>
        <table className="show-list">
          <thead>
            <tr>
              <th>Name</th>
              <th>Series</th>
              <th>Digital</th>
              <th>Colors</th>
              <th>Price</th>
              <th>Id</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.state.instrumentItems.map((items) => (
              <tr key={items.id}>
                <td className="name">{items.name}</td>
                <td>{items.series}</td>
                <td>{items.digital.toString()}</td>
                <td>{items.colors.toString()}</td>
                <td>{`${items.price
                  .toString()
                  .padStart(items.price.toString().length + 1, "$")}`}</td>
                <td>{items._id}</td>
                <td>
                  <button className="edit-button">Edit</button>
                </td>
                <td>
                  {/* <button className="delete-button">Delete</button> */}
                  {/* <DeleteInstruments id={items._id} /> */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {this.state.instrumentItems.length === 0 ? (
          <p className="noItems">No items found</p>
        ) : (
          <div />
        )}
      </div>
    );
  }
}

export default GetInstruments;
