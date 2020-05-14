import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import Router from './router'
import { Store } from './store_config'

ReactDOM.render(
    <Provider store={Store}>
        <BrowserRouter>
            <Router />
        </BrowserRouter>
    </Provider>,

    document.getElementById('root')
)
