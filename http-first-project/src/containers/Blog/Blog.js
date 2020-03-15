import React, { Component } from "react";

import Post from "../../components/Post/Post";
import FullPost from "../../components/FullPost/FullPost";
import NewPost from "../../components/NewPost/NewPost";
import axious from "axios";
import "./Blog.css";

class Blog extends Component {
  state = {
    data: [],
    selectedPost: null
  };

  componentDidMount() {
    axious.get("https://jsonplaceholder.typicode.com/posts").then(resp => {
      const posts = resp.data.splice(0, 4);
      const updatedPosts = posts.map(post => {
        return {
          ...post,
          author: "Ketan-" + post.id
        };
      });
      this.setState({ data: updatedPosts });
    });
  }

  selectedPostHandler = id => {
    this.setState({ selectedPost: id });
  };
  render() {
    const posts = this.state.data.map(post => (
      <Post
        title={post.title}
        author={post.author}
        key={post.id}
        clicked={() => this.selectedPostHandler(post.id)}
      />
    ));
    return (
      <div>
        <section className="Posts">{posts}</section>
        <section>
          <FullPost id={this.state.selectedPost} />
        </section>
        <section>
          <NewPost />
        </section>
      </div>
    );
  }
}

export default Blog;
