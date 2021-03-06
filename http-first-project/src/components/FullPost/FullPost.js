import React, { Component } from "react";
import axios from "axios";

import "./FullPost.css";

class FullPost extends Component {
  state = { fullPost: null };

  componentDidUpdate() {
    if (this.props.id) {
      if (
        !this.state.fullPost ||
        (this.state.fullPost && this.state.fullPost.id !== this.props.id)
      ) {
        axios
          .get("https://jsonplaceholder.typicode.com/posts/" + this.props.id)
          .then(resp => this.setState({ fullPost: resp.data }));
      }
    }
  }
  render() {
    let post = <p style={{ textAlign: "center" }}>Please select a Post!</p>;
    if (this.props.id) {
      post = <p style={{ textAlign: "center" }}>Loading!</p>;
      if (this.state.fullPost) {
        post = (
          <div className="FullPost">
            <h1>{this.state.fullPost.title}</h1>
            <p>{this.state.fullPost.body}</p>
            <div className="Edit">
              <button className="Delete">Delete</button>
            </div>
          </div>
        );
      }
    }

    return post;
  }
}

export default FullPost;
