import React, { useState } from 'react'
import './App.css'
import Scene from './Scene.jsx';

const cubePath = '/obj/cube.obj'
const sharkPath = '/obj/shark.obj'
const betterSharkPath = '/obj/bettershark.obj'

const models = [cubePath, sharkPath, betterSharkPath]

function App() {
  const [model, setModel] = useState(cubePath);
  const [prompt, setPrompt] = useState('');
  function handleChange(event) {
    setPrompt(event.target.value);
  }
  function handleSubmit(event) {
    alert('A prompt was submitted: ' + prompt);
    event.preventDefault();
  }
  return (
    <div className="App">
      <h1>/CL//AI/</h1>
      <div>
        <div className='form' >
          <form onSubmit={handleSubmit} >
            <label>
              <textarea value={prompt} onChange={handleChange} placeholder="Describe something..." />
            </label>
            <input type="submit" value="Submit" />
          </form>
        </div>
        <Scene model={model} />
        <div className='carosel' style={{display: 'flex', flexDirection: 'row'}}>
          {models.map((modelPath, index) => (
            <button key={index} onClick={e => setModel(modelPath)}>{modelPath}</button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default App
