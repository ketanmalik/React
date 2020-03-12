import React, { Component } from "react";
import Persons from "../Components/Persons/Persons";
import Cockpit from "../Components/Cockpit/Cockpit";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    console.log("constructor");
  }

  state = {
    persons: [
      {
        key: "1a",
        name: "Dan",
        age: 17
      },
      {
        key: "1b",
        name: "Ran",
        age: 28
      },
      {
        key: "1c",
        name: "Wan",
        age: 25
      }
    ],
    showPersons: false,
    showCockpit: true
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

  togglePersonsHandler = () => {
    this.setState({
      showPersons: !this.state.showPersons
    });
  };

  deletePersonHandler = personIndex => {
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({ persons: persons });
  };

  nameChangeHandler = (event, index) => {
    const person = { ...this.state.persons[index] };
    person.name = event.target.value;
    const persons = [...this.state.persons];
    persons[index] = person;
    this.setState({ persons: persons });
  };

  static getDerivedStateFromProps(props, state) {
    console.log("getDerivedState");
    console.log(props);
    return state;
  }

  componentDidMount() {
    console.log("didMount");
  }

  shouldComponentUpdate() {
    console.log("App shouldComponentUpdate");
    return true;
  }
  componentDidUpdate() {
    console.log("App componentDidUpdate");
  }

  render() {
    console.log("App render");
    let persons = null;
    if (this.state.showPersons) {
      persons = (
        <Persons
          persons={this.state.persons}
          clicked={this.deletePersonHandler}
          changed={this.nameChangeHandler}
        />
      );
    }

    return (
      <div className="App">
        <button
          onClick={() =>
            this.setState({ showCockpit: !this.state.showCockpit })
          }
        >
          Remove Cockpit
        </button>
        {this.state.showCockpit ? (
          <Cockpit
            persons={this.state.persons.length}
            showPersons={this.state.showPersons}
            clicked={this.togglePersonsHandler}
          />
        ) : null}
        {persons}
      </div>
    );
  }
}

export default App;
