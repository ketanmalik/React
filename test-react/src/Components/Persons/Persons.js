import React from "react";
import Person from "../Person/Person";

const persons = props =>
  props.persons.map((person, index) => {
    return (
      <Person
        name={person.name}
        age={person.age}
        key={person.key}
        clicked={() => props.clicked(index)}
        changed={event => props.changed(event, index)}
      />
    );
  });

export default persons;
