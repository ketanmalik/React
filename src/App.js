import React, { Component } from "react";
import "./App.css";
import UserInput from "./UserInput/UserInput";
import UserOutput from "./UserOutput/UserOutput";

class App extends Component {
  state = {
    users1: ["User-1", "User-2"],
    users2: ["User-3", "User-4"],
    username: "Default Username"
  };

  usernameHandler = event => {
    this.setState({
      users1: [event.target.value, event.target.value],
      users2: [event.target.value, event.target.value],
      username: "Default Username"
    });
  };

  render() {
    return (
      <div>
        <UserInput change={this.usernameHandler} />
        <UserOutput users={this.state.users1} />
        <UserOutput users={this.state.users2} />
      </div>
    );
  }
}

export default App;
