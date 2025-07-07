import './index.css'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { AuthProvider } from './contexts/AuthContext';

const client = new ApolloClient({
  uri: 'https://samaelism-app-be.vercel.app/graphql' /* 'http://localhost:3000/graphql' */,
  cache: new InMemoryCache()
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ApolloProvider>
  </StrictMode>
)

// Registrazione del service worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js').then(
      (registration) => {
        console.log('✅ SW registrato:', registration)
      },
      (error) => {
        console.error('❌ Registrazione SW fallita:', error)
      }
    )
  })
}
