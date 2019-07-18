import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore, compose, applyMiddleware } from 'redux'
import chatReducer from './Reducers/chatReducer'
import App from './App';
import * as serviceWorker from './serviceWorker';
import thunk from 'redux-thunk'

const store = createStore(
    chatReducer,
    applyMiddleware(thunk)
  );

ReactDOM.render(<Provider store={store}>
<App />
</Provider>
, document.getElementById('root'));
serviceWorker.unregister();
