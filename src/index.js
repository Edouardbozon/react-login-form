import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './index.css';
import Login from './Login';

const handleSubmit = (e, data) => {
    return axios.post('https://requestb.in/12b7sto1', { data });
};

ReactDOM.render(<Login title="Login" async={false} action="login" />, document.getElementById('root'));
