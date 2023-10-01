import React from 'react';
import './App.css';
import Post from './component/home/home';
import Chat from './component/home/chat';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import SignUp from './component/home/signup';
function App() {
  return (
    <div>
      <BrowserRouter>
        <nav>
          <Link to="/">Post</Link><br/>
          <Link to="/signup">Signup</Link><br/>
          <Link to="/chat">Chat</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Post />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
