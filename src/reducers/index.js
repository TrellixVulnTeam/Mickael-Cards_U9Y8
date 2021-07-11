import { combineReducers } from 'redux';
import transactionsReducer from './transactionsReducer';
import categoriesReducer from './categoriesReducer';
import modalReducer from './modalReducer';
import selectReducer from './selectReducer';

export default combineReducers({
    transactions: transactionsReducer,
    categories: categoriesReducer,
    modal: modalReducer,
    select: selectReducer
});