import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Mounts } from './page/Mounts';
import Mount from './page/Mount';


function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Mounts/>} />
          <Route path='/:id' element={<Mount/>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
