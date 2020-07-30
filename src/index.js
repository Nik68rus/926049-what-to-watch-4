import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app.jsx';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import reducer from './reducer/reducer';
import {Operation} from './reducer/data/data';
import thunk from 'redux-thunk';
import {createAPI} from './api';
import {composeWithDevTools} from 'redux-devtools-extension';

const onUnauthorized = () => {

};

const api = createAPI(onUnauthorized);

const store = createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(thunk.withExtraArgument(api))
    )
);

store.dispatch(Operation.loadMovies());
store.dispatch(Operation.getPromo());

ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.querySelector(`#root`)
);

