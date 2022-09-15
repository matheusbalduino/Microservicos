import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CommentCreate from './CommentCreate'
import CommentList from './CommentList'

import App from './App.css'

export function PostList () {
  const [posts, setPost ] = useState({});

  async function fecthPost(){
    const res = await axios.get('http://localhost:4002/posts');
    setPost(res.data);
  }

  useEffect( () => {
    fecthPost();
  }, []);

  console.log(posts)
  const list = Object.values(posts).map( post => {
    return (
      <div className="card" 
      style={{ width: '30%', marginBottom:'20px' }} 
      key={post.id}
      >
        <div className="card-body">
          <h3> {post.title} </h3>
        </div>
        <CommentList comments={post.comments} />
        <CommentCreate postId={post.id}/>
      </div>
    );
  });

  return (
    <div className="flex-wrap flex-row d-flex  justify-content-between mt-3">
      {list}
    </div>
  ) 
}