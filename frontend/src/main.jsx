import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './state/store.js'
import initI18n from './i18n'
import { I18nextProvider } from 'react-i18next'

const i18n = initI18n()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <I18nextProvider i18n={i18n} defaultNS={'translation'}>
        <App />
      </I18nextProvider>
    </Provider>
  </StrictMode>,
)
