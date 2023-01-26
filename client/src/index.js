import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';

import App from './app';

import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/global.scss';

const Root = ReactDOM.createRoot(document.getElementById('root'));
  Root.render(
    <React.StrictMode>
      <BrowserRouter>
       <Provider store={store}>
        <App />
       </Provider>
      </BrowserRouter>
     </React.StrictMode>  
);

