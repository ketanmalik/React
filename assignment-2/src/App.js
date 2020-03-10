import React, { Component } from "react";
import ValidationComponent from "./ValidationComponent/ValidationComponent";
import CharComponents from "./CharComponents/CharComponents";
import "./App.css";

class App extends Component {
  state = {
    inputString: ""
  };

  stringChangeHandler = event => {
    this.setState({ inputString: event.target.value });
  };

  charClickedHandler = index => {
    const stringArr = this.state.inputString.split("");
    stringArr.splice(index, 1);
    const updatedStr = stringArr.join("");
    this.setState({ inputString: updatedStr });
  };

  render() {
    let charComponents = null;
    charComponents = this.state.inputString.split("").map((ch, index) => {
      return (
        <CharComponents
          character={ch}
          clicked={() => this.charClickedHandler(index)}
        />
      );
    });
    return (
      <div className="App">
        <input
          type="text"
          onChange={this.stringChangeHandler}
          value={this.state.inputString}
        />
        <p>Length of String: {this.state.inputString.length}</p>
        <ValidationComponent len={this.state.len} />
        {charComponents}
      </div>
    );
  }
}

export default App;
