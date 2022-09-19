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

  await axios.post('http://localhost:4005/event s',{
    type:'CommentCreated',
    data:{
      id:commentId, 
      content, 
      postId:id,
      status:'pending'
    }
  }).catch(error => console.log(error.message));

  res.status(201).send(commentsByPostId);
})

app.post('/events', async (req, res) => {
 const { type, data } = req.body;

 if(type === "CommentModerated"){
   console.log("CommentModerated");

   const { postId, id, status, content } = data;

   const comments = commentsByPostId[postId];

   const comment = comments.find( comment => {return comment.id === id} );

   comment.status = status;

  await axios.post('http://localhost:4005/events', {
    type: "CommentUpdated",
    data:{
      id,
      status,
      postId,
      content
    }
  }).catch(err => console.log(err))

 }
  console.log('retornando')
  res.send({})

})

app.listen(4001, () => {
  console.log('listening 4001');
})