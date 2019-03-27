import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import promiseMiddleware from 'redux-promise';
import ReduxThunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import rootReducer from './reducers/root_reducer';
import Routes from './routes';


const middleware = [promiseMiddleware, ReduxThunk];

const store = createStore(rootReducer, composeWithDevTools(
    applyMiddleware(...middleware)
));

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Routes/>
        </BrowserRouter>
    </Provider>,

    document.getElementById('root')
);
