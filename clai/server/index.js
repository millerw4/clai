import express from 'express';
import * as dotenv from 'dotenv';
dotenv.config();
// import cors from 'cors';
import morgan from 'morgan';
import _ from 'lodash';

import files from './files.js';
import api from './api.js';

const app = express();
const PORT = process.env.PORT || 3000;

//serve static ..?

//mount middleware
// app.use(cors());
app.use(express.json());
app.use(express.text());
app.use(morgan('tiny'));

//routes
app.get('/api/object', (req, res) => {
  files.readObjFilenames()
    .then(names => res.json(names))
    .catch(err =>  res.status(500).send(err));
});

app.post('/api/prompt', (req, res) => {
  const prompt = req.body;
  const title = _.camelCase(prompt.split(' ').slice(0, 3).join(' '));
  console.log('IM IN POST PROMPT\n', 'title: ', title, '\nprompt: ', prompt);
  api.sendPrompt(req.body)
    .then(response => {
      if(response.data === undefined) {
        return response;
      } else {
        console.log('Full response data from OpenAI API:\n', response.data);
        const results = response.data.choices.map(choice => choice.text);
        return files.writeObj(title, results);
      }
    })
    .then(result =>  res.status(201).send(result))
    .catch(err => {
      console.log('api or fileWrite error', err, '\n\n', );
      res.status(500).send(err);
    });
});

console.log('listening on port:', PORT);
app.listen(PORT);