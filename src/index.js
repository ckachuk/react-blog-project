import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import RouteSwitch from "./RouteSwitch";
import { HashRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HashRouter>
      <RouteSwitch />
    </HashRouter>
  </React.StrictMode>
);
