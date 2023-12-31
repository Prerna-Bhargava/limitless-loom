import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { CartProvider } from "./context/cart";
import { AuthProvider } from "./context/auth";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider>
    <CartProvider>
      <App />
    </CartProvider>
   </AuthProvider>
);

reportWebVitals();
