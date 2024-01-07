
// import {
//   BrowserRouter as Router,
//   Route,
//   Routes,
// } from "react-router-dom";

// import './App.css';

// import { Center, VStack, Link, Box } from '@chakra-ui/react';
// import { Head } from "../pages/Home"
// import { Register } from "../pages/Register"
// import { Login } from "../pages/Login"
// // import SecondPage from "../pages/SecondPage"
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { FirstPage } from "../pages/firstPage"
import SecondPage from "../pages/SecondPage"

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FirstPage />} />
        <Route path="/secondPage" element={<SecondPage />} />
      </Routes>
    </Router>
  );
};

export default App;