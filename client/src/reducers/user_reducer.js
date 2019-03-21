export default function (state = {}, action) {
    switch (action.type) {
        case 'USER_LOG_IN':
            return {
                ...state,
                login: action.payload
            };
        case 'CLEAR_USER_LOGIN':
            return {
                ...state,
                login: action.payload
            };
        case 'CHECK_USER_AUTH_STATUS':
            return {
                ...state,
                user: action.payload
            };
        default:
            return state;
    }

}