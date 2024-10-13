import React from 'react';
import { createRoot } from 'react-dom/client'
import './index.css'
import {App} from './App';
import {Provider} from 'react-redux';
import {store} from './state/store';

createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <App/>
    </Provider>
)
