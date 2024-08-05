// App.js or index.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Placeorder from './components/placeorder';
import Summary from './components/summary';
import Sucess from './components/sucess';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Placeorder />} />
        <Route path="/summary" element={<Summary />} />
        <Route path="/success" element={<Sucess />} />
      </Routes>
    </Router>
  );
};
export default App;
