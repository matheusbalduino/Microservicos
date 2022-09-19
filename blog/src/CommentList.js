import React from 'react';

import App from './App.css'

export default ({comments}) => {
 
  const list = comments.map( (comment) => {
    switch(comment.status){
      case "pending": comment.content = "Waiting moderation";
        break;
      case "rejected": comment.content = "Comment has been rejected";
        break; 
      default: break;
    }

    return (
      <li key={comment.id} > {comment.content} </li>
    );
  })
  return (
    <ul>{list}</ul>
  );
}