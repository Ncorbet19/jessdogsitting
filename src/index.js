import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Jess from './components/Jess';
import PaymentPage from './components/PaymentPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/jess" element={<Jess />} />
        <Route path="/payment/:requestId" element={<PaymentPage />} />
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
