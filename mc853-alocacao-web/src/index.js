import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';

import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter} from "react-router-dom";


import App from './components/App';

let app = (<BrowserRouter><App/></BrowserRouter>);

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
