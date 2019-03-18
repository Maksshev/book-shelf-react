import {combineReducers} from 'redux';
import userReducer from './user_reducer';
import bookReducer from './book_reducer';

const rootReducer = combineReducers({
    bookReducer,
    userReducer
});


export default rootReducer;