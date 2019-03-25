import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose} from 'redux';
import promiseMiddleware from 'redux-promise';
import ReduxThunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';

//redux
import rootReducer from './reducers/root_reducer';

//components
import Routes from './routes';

// const createStoreWithMiddleware = applyMiddleware(promiseMiddleware, ReduxThunk)(createStore);

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
