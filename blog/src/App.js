import React from 'react';
import CreatePost from './CreatePost';
import {PostList} from './PostList'
import App from './App.css'

export default () =>{
  return (
  <div className="container">
     <h1>Create Post</h1>
     <CreatePost/>
     <hr />
     <h1>Posts</h1>
     <PostList/>
  </div>
  );
}