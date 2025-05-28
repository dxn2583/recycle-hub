import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import AddBinPage from './Pages/AddBinPage';
import Header from './components/Header';
import Footer from './components/Footer';
import './styles/App.css';


function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddBinPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
