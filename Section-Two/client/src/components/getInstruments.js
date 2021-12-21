import React, { Component } from "react";
import axios from "axios";
import DeleteInstruments from "./deleteInstruments";
import PutInstruments from "./putInstruments";
import Modal from "./modal";

class GetInstruments extends Component {
  constructor() {
    super();
    this.state = {
      instrumentItems: [],
      searchQuery: "",
      searchBy: "name",
      ToggleModal: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleReset(e) {
    e.preventDefault();
    this.componentDidMount();
    this.setState({ searchQuery: "" });
  }

  handleToggle(id) {
    if (this.state.ToggleModal === true) {
      this.setState({ ToggleModal: { [id]: false } });
    } else {
      this.setState({ ToggleModal: { [id]: true } });
    }
  }

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
    fetch(
      "http://localhost:8080/api/itemsIntake?" +
        this.state.searchBy +
        "=" +
        this.state.searchQuery
    )
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
            <div className="search-title">
              <label>Search by:</label>
              <select
                className="search-by"
                value={this.state.searchBy}
                name="searchBy"
                onChange={this.handleChange}
              >
                <option value="name">Name</option>
                <option value="series">Series</option>
                <option value="digital">Digital</option>
                <option value="colors[]">Color</option>
                <option value="_id">Id</option>
              </select>
            </div>
            <div>
              <input
                type="text"
                placeholder="Ex: Arius or C7X"
                name="searchQuery"
                value={this.state.searchQuery}
                onChange={this.handleChange}
              />
            </div>
            <div>
              <button className="search-button">Search</button>
              <button className="red-button" onClick={this.handleReset}>
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
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {this.state.instrumentItems.map((items) => (
              <tr key={items._id}>
                <td className="name">{items.name}</td>
                <td>{items.series}</td>
                <td>{items.digital.toString()}</td>
                <td>{items.colors.join(", ")}</td>
                <td>{`${items.price
                  .toString()
                  .padStart(items.price.toString().length + 1, "$")}`}</td>
                <td>{items._id}</td>
                <td>
                  <button
                    className="edit-button"
                    onClick={this.handleToggle.bind(this, items._id)}
                  >
                    Edit
                  </button>
                  <Modal
                    open={this.state.ToggleModal[items._id]}
                    onClose={this.handleToggle}
                  >
                    <PutInstruments
                      onClose={this.handleToggle}
                      submit={this.handleReset}
                      id={items._id}
                      name={items.name}
                      series={items.series}
                      digital={items.digital}
                      colors={items.colors}
                      price={items.price}
                    />
                  </Modal>
                </td>
                <td>
                  <DeleteInstruments submit={this.handleReset} id={items._id} />
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
