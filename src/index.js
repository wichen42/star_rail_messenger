import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthContextProvider } from './context/AuthContext';
import { ChatContextProvider } from './context/ChatContext';
import { ErrorContextProvider } from './context/ErrorContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ErrorContextProvider>
    <AuthContextProvider>
        <ChatContextProvider>
          <React.StrictMode>
            <App />
          </React.StrictMode>
        </ChatContextProvider>
      </AuthContextProvider>
  </ErrorContextProvider>
);

