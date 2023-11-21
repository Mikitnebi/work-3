import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();


ReactDOM.render(
  <BrowserRouter>
    <React.StrictMode>
    <QueryClientProvider client={queryClient}>
    <App />

    </QueryClientProvider>

    </React.StrictMode>
  </BrowserRouter>,
  document.getElementById('root')
);