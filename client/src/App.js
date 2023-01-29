import Home from "./components/Home.js";
import {Route, BrowserRouter, Routes, Navigate} from 'react-router-dom'
import { useState } from 'react'

function App() {
  return(
    <BrowserRouter>
      <Routes>
        <Route path={'/'} element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
