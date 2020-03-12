import React, { Component } from "react";
import Person from "./Person/Person";

class Persons extends Component {
  // static getDerivedStateFromProps(props, state) {
  //   console.log("Persons getDerivedStateFromProps");
  //   return state;
  // }
  shouldComponentUpdate(nextProps, nextState) {
    console.log("Persons shouldComponentUpdate");
    return true;
  }
  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log("Persons getSnapshotBeforeUpdate");
    return { message: "should Update" };
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log("Persons componentDidUpdate");
    console.log(snapshot);
  }
  render() {
    return this.props.persons.map((person, index) => {
      console.log("Persons render");
      return (
        <Person
          name={person.name}
          age={person.age}
          key={person.key}
          clicked={() => this.props.clicked(index)}
          changed={event => this.props.changed(event, index)}
        />
      );
    });
  }
}

export default Persons;
