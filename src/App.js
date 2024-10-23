import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Login from './common/Login';
import Signup from './common/Signup';
import axios from 'axios';
import InterestForm from './common/InterestForm';
import SkillForm from './common/SkillForm';

function App() {
    axios.defaults.baseURL = "http://localhost:5001"
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/interest" element={<InterestForm />} />
                    <Route path="/skillform" element={<SkillForm />} />
                    <Route path="/" element={<Navigate to="/login" />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
