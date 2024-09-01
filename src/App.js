import { useState } from 'react';
import './App.css';
import Books from './Books';
import Home from './Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


function App() {
const [bookType,setBookType]=useState(null);
const handleDataFromHome=(selectedBookType)=>{
  setBookType(selectedBookType)
}

  return (
    <>
      <Router>
          <Routes>
            <Route path="/" element={<Home onClickEvent={handleDataFromHome}/>} />
            <Route path="/books" element={<Books bookType={bookType}/>} />
          </Routes>
      </Router>
    </>
  );
}

export default App;
