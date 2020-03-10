import React, { Component } from "react";
import Person from "./Person/Person";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  state = {
    persons: [
      {
        name: "Dan",
        age: 17
      },
      {
        name: "Ran",
        age: 28
      },
      {
        name: "Wan",
        age: 25
      }
    ]
  };

  buttonHandler = name => {
    this.setState({
      persons: [
        {
          name: name,
          age: 17
        },
        {
          name: "Ran",
          age: 28
        },
        {
          name: "Wan",
          age: 30
        }
      ]
    });
  };

  nameHandler = event => {
    this.setState({
      persons: [
        {
          name: "Dan",
          age: 17
        },
        {
          name: event.target.value,
          age: 28
        },
        {
          name: "Wan",
          age: 30
        }
      ]
    });
  };
  render() {
    const style = {
      backgroundColor: "white",
      font: "inherit",
      border: "1px solid blue",
      padding: "8px"
    };
    return (
      <div className="App">
        <h1 className="App-intro">First React App</h1>
        <button style={style} onClick={() => this.buttonHandler("Not Bind")}>
          Click Me!
        </button>
        <Person
          name={this.state.persons[0].name}
          age={this.state.persons[0].age}
        />
        <Person
          name={this.state.persons[1].name}
          age={this.state.persons[1].age}
          click={() => this.buttonHandler("Not Bind")}
          changed={this.nameHandler}
        >
          My Hobbies: Racing
        </Person>
        <Person
          name={this.state.persons[2].name}
          age={this.state.persons[2].age}
        />
      </div>
    );
  }
}

export default App;
