import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import promiseMiddlware from 'redux-promise';
import ReduxThunk from 'redux-thunk';

//redux
import rootReducer from './reducers/root_reducer';

//components
import Routes from './routes';

const createStoreWithMiddleware = applyMiddleware(promiseMiddlware, ReduxThunk)(createStore);


ReactDOM.render(
    <Provider store={createStoreWithMiddleware(rootReducer)}>
        <BrowserRouter>
            <Routes/>
        </BrowserRouter>
    </Provider>,

    document.getElementById('root')
);
