import React, { useState } from 'react'
import axios from 'axios'
import './App.css'
import Scene from './Scene.jsx';

const cubePath = '/obj/cube.obj'
const sharkPath = '/obj/shark.obj'
const betterSharkPath = '/obj/bettershark.obj'
const newObj = '/obj/newObject.obj'

const defaultModels = [cubePath, sharkPath, betterSharkPath, newObj]

function App() {
  const [models, setModels] = useState(defaultModels)
  const [model, setModel] = useState(cubePath);
  const [prompt, setPrompt] = useState('');
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
        .then(res => {
          console.log(res)
        })
        .catch(err => console.log('axerror: ', err))
    } else {
      event.preventDefault();
    }
  }
  return (
    <div className="App">
      <h1>/CL//AI/</h1>
      <button><a href={model}>{`download ${model}`}</a></button>
      <Scene model={model} />
      <div className='carosel' style={{display: 'flex', flexDirection: 'row'}}>
        {models.map((modelPath, index) => (
          <button key={index} onClick={e => setModel(modelPath)}>{modelPath}</button>
        ))}
      </div>
      <div className='form' >
        <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column'}} >
          <textarea value={prompt} onChange={handleChange} placeholder="Describe something..." />
          <input type="submit" value="Sculpt (Send to AI)" />
        </form>
      </div>
    </div>
  )
}

export default App
