import React, { useState } from 'react';
import axios from 'axios';

import App from './App.css'

export default () => {
  const [title, setTitle] = useState('');

  const onSubmit = async (event) => {
    event.preventDefault();

    const sent = await axios.post('http://localhost:4000/posts', {
      title
    });
    console.log(sent);
    setTitle('');

  }
  return (
    <div>
    <form onSubmit={onSubmit}>
      <div className="form-group">
          <label htmlFor="" >Title</label>
          <input 
            value={title} 
            onChange={e => setTitle(e.target.value)} 
            type="text" 
            className="form-control" />  
     </div>
     <button className="btn btn-primary mt-3">Submit</button>
    </form>
  </div>
  );
}