import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'
import Scene from './Scene.jsx';

//default data - breaks project if not in public folder
const cubePath = '/obj/cube.obj'
const sharkPath = '/obj/shark.obj'
const betterSharkPath = '/obj/bettershark.obj'
const newObj = '/obj/newObject.obj'
const defaultModels = [cubePath, sharkPath, betterSharkPath, newObj]

async function getModels() {
  const response = await fetch('/api/object', {method: 'GET'});
  let models = await response.json();
  models = models.map(model => '/obj/' + model);
  console.log(models);
  return models;
}

function App() {
  const [models, setModels] = useState(defaultModels)
  const [model, setModel] = useState(cubePath);
  const [prompt, setPrompt] = useState('');

  useEffect(() => {
    getModels().then(models => setModels(models));
  }, [])

  function handleChange(event) {
    setPrompt(event.target.value);
  }
  function handleSubmit(event) {
    if (confirm('Send to AI:\n' + prompt)) {
      const options = {
        method: 'POST',
        body: prompt
      }
      fetch('/api/prompt', options)
        .then(() => getModels())
        .then(models => setModels(models))
        .catch(err => console.log('error: ', err))
    }
    event.preventDefault();
  }
  const caroStyle = {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    overflow: 'x-auto',
    flexWrap: 'wrap',
    justifyContent: 'space-around'
  };
  return (
    <div className="App">
      <h1>/CL//AI/</h1>
      <Scene model={model} />
      <button><a href={model}>{`download ${model}`}</a></button>
      <div style={{width: '500px'}}>
        <div className='form' >
          <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column'}} >
            <textarea value={prompt} onChange={handleChange} style={{resize: 'vertical'}} placeholder="Describe something..." />
            <input type="submit" value="Sculpt (Send to AI)" />
          </form>
        </div>
        <div className='carosel' style={caroStyle}>
          {models.map((modelPath, index) => (
            <button key={index} onClick={e => setModel(modelPath)}>{modelPath}</button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default App;