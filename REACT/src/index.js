import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import 'bootstrap/dist/css/bootstrap.min.css';
import ContextoGlobal from './contexto/ContextoGlobal';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ContextoGlobal>
      <App />
    </ContextoGlobal>
  </React.StrictMode>
);

