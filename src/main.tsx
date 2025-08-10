import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';
import './index.css'
import App from './App.tsx'
import store from './store/store.ts';
createRoot(document.getElementById('root')!).render( 
    <Provider store={store}>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </Provider>
)
