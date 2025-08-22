import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom' // <-- import this
import 'core-js'
import { ToastContainer } from 'react-toastify'
import 'bootstrap/dist/css/bootstrap.min.css';

import App from './App'
import store from './store'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter> {/* <-- wrap App in this */}
      <App />
      <ToastContainer />
    </BrowserRouter>
  </Provider>
)
