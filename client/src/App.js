import React from 'react';
import './App.css';
import { ListGroup, ListGroupItem } from 'reactstrap';
import axios from 'axios'
import PostList from './PostList'

export default class App extends React.Component { 
  constructor() {
    super()
    this.state = {
      posts: [],
    }
  }

componentDidMount() { 
  axios
    .get('http://localhost:7000/api/posts')
    .then(response => {
      this.setState({posts: response.data})
      console.log(this.state.posts)
    })
  }

render() {
    return(
    <div className="App">
      <div>
        <br></br>
        <PostList posts={this.state.posts} />
      </div>
    </div>
    )
  }
}

