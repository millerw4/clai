import express from 'express';
const app = express();
const PORT = 3000;

//serve static

//mount middleware

//routes


app.post('/prompt', (req, res) => {
  console.log(req.body);
  res.status(201).send('got it!');
});

console.log('listening on port', PORT);
app.listen(PORT);