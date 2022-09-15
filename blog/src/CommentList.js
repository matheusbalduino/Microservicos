import React from 'react';

import App from './App.css'

export default ({comments}) => {
 
  const list = comments.map( (comment) => {
    return (
      <li key={comment.id} > {comment.content} </li>
    );
  })
  return (
    <ul>{list}</ul>
  );
}