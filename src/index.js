import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'typeface-roboto';
import registerServiceWorker from './registerServiceWorker';
import Controller from './screens/Controller';
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.render(
    <Router>
        <Controller />
    </Router>,
    document.getElementById('root'));
registerServiceWorker();
