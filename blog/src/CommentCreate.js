import axios from 'axios';
import react, { useState } from 'react'
import App from './App.css'

export default ({postId}) => {

  const [content, setContent] = useState('');

  const onSubmit = async (event) => {
    event.preventDefault();
    await axios.post(`http://localhost:4001/posts/${postId}/comments`, { 
      content 
    });

    setContent('');
    
  } 

  return (
    <div className="container mb-3">
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label> New Comment </label>
          <input type="text"
          value={content}
          onChange={ e => setContent(e.target.value) }
          className="form-control" />
        </div>
        <button className="btn btn-primary mt-3"> Submit </button>
        </form>
    </div>
  )
}