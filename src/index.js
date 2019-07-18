import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore, compose } from 'redux'
import chatReducer from './reducers/chatReducer'
import App from './App';
import * as serviceWorker from './serviceWorker';

const store = compose(window.devToolsExtension ? window.devToolsExtension()
: f => f)(createStore)(chatReducer)


ReactDOM.render(<Provider store={store}>
<App/>
</Provider>
, document.getElementById('root'));
serviceWorker.unregister();
