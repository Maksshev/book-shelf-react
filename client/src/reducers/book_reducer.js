export default function (state = {}, action) {
    switch (action.type) {
        case 'GET_BOOKS':
            return {...state, books: action.payload};
        case 'GET_BOOK_WITH_REVIEWER':
            return {...state, ...action.payload};
        case 'CLEAR_BOOK_WITH_REVIEWER':
            return {...state, ...action.payload};
        default:
            return {...state};
    }
}