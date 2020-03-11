import React, { Component } from "react";
import styled from "styled-components";
import Person from "./Person/Person";
import "./App.css";
import person from "./Person/Person";

const StyledButton = styled.button`
  background-color: ${props => (props.alt ? "red" : "green")};
  color: white;
  font: inherit;
  border: 1px solid blue;
  padding: 8px;

  &:hover {
    background-color: ${props => (props.alt ? "salmon" : "lightgreen")};
    color: black;
  }
`;
class App extends Component {
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
    showPersons: false
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
    // const persons = this.state.persons.splice();
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

  render() {
    // const style = {
    //   backgroundColor: "green",
    //   color: "white",
    //   font: "inherit",
    //   border: "1px solid blue",
    //   padding: "8px",
    //   ":hover": {
    //     backgroundColor: "lightgreen",
    //     color: "black"
    //   }
    // };

    let persons = null;
    if (this.state.showPersons) {
      persons = (
        <div>
          {this.state.persons.map((p, index) => {
            return (
              <Person
                name={p.name}
                age={p.age}
                key={p.key}
                click={() => this.deletePersonHandler(index)}
                changed={event => this.nameChangeHandler(event, index)}
              />
            );
          })}
        </div>
      );
      // style.backgroundColor = "red";
      // style[":hover"] = {
      //   backgroundColor: "salmon",
      //   color: "black"
      // };
    }

    const classes = [];
    if (this.state.persons.length <= 2) classes.push("red");
    if (this.state.persons.length <= 1) classes.push("bold");

    return (
      <div className="App">
        <h1 className="App-intro">Hi, I'm a React App!</h1>
        <p className={classes.join(" ")}>This is really working!</p>
        <StyledButton
          alt={this.state.showPersons}
          onClick={this.togglePersonsHandler}
        >
          Click Me!
        </StyledButton>
        {persons}
      </div>
    );
  }
}

export default App;
