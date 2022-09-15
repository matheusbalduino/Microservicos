const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const axios = require('axios')
const cors = require('cors');
const app = express();
app.use(bodyParser.json());
app.use(cors())

const commentsByPostId= {};

app.get('/posts/:id/comments', (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
})

app.post('/posts/:id/comments', async (req, res) => {
  const commentId = randomBytes(4).toString('hex');
  const { id } = req.params;
  const { content } = req.body;

  if(!commentsByPostId[id]) commentsByPostId[id] = [];
  commentsByPostId[id].push({id: commentId, content});

  await axios.post('http://localhost:4005/events',{
    type:'CommentCreated',
    data:{
      id:commentId, content, postId:id
    }
  }).catch(error => console.log(error.message));

  res.status(201).send(commentsByPostId);
})

app.post('/events', (req, res) => {
  console.log('Comment Received', req.body.type);
  
  res.send({})
})

app.listen(4001, () => {
  console.log('listening 4001');
})