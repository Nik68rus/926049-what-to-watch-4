import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app.jsx';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import reducer from './reducer/reducer';
import {Operation as DataOperation} from './reducer/data/data';
import {Operation as UserOperation, AuthorizationStatus, ActionCreator} from './reducer/user/user';
import thunk from 'redux-thunk';
import {createAPI} from './api';
import {composeWithDevTools} from 'redux-devtools-extension';
import history from './history';
import {AppRoute} from './constants';

const onUnauthorized = () => {
  store.dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.NO_AUTH));
  history.push(AppRoute.LOGIN);
};

const api = createAPI(onUnauthorized);

const store = createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(thunk.withExtraArgument(api))
    )
);

store.dispatch(DataOperation.loadMovies());
store.dispatch(DataOperation.getPromo());
store.dispatch(DataOperation.getFavorite());
store.dispatch(UserOperation.checkAuth());

ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.querySelector(`#root`)
);

