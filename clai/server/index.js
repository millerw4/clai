import express from 'express';
import * as dotenv from 'dotenv'; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();
import cors from 'cors';
import files from './files.js';
import api from './api.js';


const app = express();
const PORT = process.env.PORT || 3000;

//serve static

//mount middleware
app.use(cors());
app.use(express.json());
app.use(express.text());
app.use((req, res, next) =>{
  console.log('serving request:', req.method, req.path, req.body);
  next();
});

//routes
app.get('/api/object', (req, res) => {
  files.readObjFilenames()
    .then(names =>  res.status(200).send(names))
    .catch(err =>  res.status(500).send(err));
});

app.post('/api/prompt', (req, res) => {
  console.log('IM IN POST PROMPT', req.body);
  api.sendPrompt(req.body)
    .then(response => {
      console.log('objdata:\n', response.data);
      return files.writeObj('newObject', response.data.choices[0].text)
    })
    .then(result =>  res.status(201).send(result))
    .catch(err => {
      console.log('api or fileWrite error', err);
      res.status(500).send(err)
    })

});

console.log('listening on port:', PORT);
app.listen(PORT);