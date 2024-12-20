import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import io from 'socket.io-client';
import { useEffect, useState } from 'react';


import Home from "./page/Homepage.jsx"
import Welcome from "./page/Welcomepage.jsx"
import Lobby from "./page/Lobbypage.jsx"
import Game from "./page/Gamepage.jsx"
import Result from "./page/Resultpage.jsx"
import Admin from "./page/Adminpage.jsx"
import Login from "./page/Loginpage.jsx"
import AudioPlayer from './utils/audioPlayer.jsx';

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <BrowserRouter>
      <div className="App">
        <AudioPlayer/>

        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/welcome" element={<Welcome/>} />
          <Route path="/lobby" element={<Lobby/>} />
          <Route path="/game" element={<Game/>} />
          <Route path="/result" element={<Result/>} />
          <Route path="/admin" element={isAuthenticated ? <Admin /> : <Login loginSuccess={() => setIsAuthenticated(true)} />} />
          {/* <Route path='/admin' element={<Admin/>} /> */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App
