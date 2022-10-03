const express = require('express');
const { randomBytes } = require('crypto');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
/**
 * Express lib
 */
const app = express();
app.use(bodyParser.json());
app.use(cors());

/**
 * Local Data
 */
const posts = {};

app.get('/posts', (req, res) => {
  res.send(posts);
});

app.post('/posts', async (req, res) => {
  const id = randomBytes(4).toString('hex');
  const { title } = req.body;

  posts[id] = {
     id, title
  };
  
  await axios.post('http://event-bus-srv:4005/events',{
    type:'PostCreated',
    data:{
      id, title
    }
  }).catch(error => console.log(error.message));

  res.status(201).send(posts[id]);
});

app.post('/events', (req, res) => {
  console.log('Received Event', req.body.type);
  
  res.send({})
})

app.listen(4000, () => {
  console.log("funciona o deploy")
  console.log('listening on 4000')
})

