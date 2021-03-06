import 'materialize-css/dist/css/materialize.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import App from './components/App';
import reducers from './reducers';

//dev only for axios test
import axios from 'axios';
window.axios = axios;

const store = createStore(reducers, {}, applyMiddleware(reduxThunk)); 
//provider tag is a redux component that can read changes in the redux store. any time redux store gets new state, it'll update all child components with new states

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root')); 
console.log('STRIPE KEY IS ', process.env.REACT_APP_STRIPE_KEY);
console.log('Environment is ', process.env.NODE_ENV);