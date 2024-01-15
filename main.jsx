import './src/index.css'


import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import {BrowserRouter} from 'react-router-dom'
//import {Toaster} from 'react-redux'

import App from './App.jsx'
import store from './src/redux/store.jsx'
import './src/styles/Tailwind.css';

ReactDOM.createRoot(document.getElementById('root')).render(

  <Provider store={store}>
    <BrowserRouter>
    <App />
    {/* <Toaster /> */}
    </BrowserRouter>
    </Provider>
)

