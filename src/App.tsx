import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import Routes from './routes';

import GlobalStyle from './styles/global';
import 'leaflet/dist/leaflet.css';
import { ToastProvider } from './hooks/Toast';

const App: React.FC = () => (
  <>
    <GlobalStyle />
    <Router>
      <ToastProvider>
        <Routes />
      </ToastProvider>
    </Router>
  </>
);

export default App;
