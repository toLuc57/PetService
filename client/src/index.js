import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import  {AdminContextProvider} from "./context/adminContext";
import  {AuthContextProvider} from "./context/authContext";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AdminContextProvider>
      <AuthContextProvider>
        <App />
      </AuthContextProvider> 
    </AdminContextProvider>       
  </React.StrictMode>
);
