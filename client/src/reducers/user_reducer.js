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
        case 'GET_REVIEWS_BY_USER':
            return {
                ...state,
                posts: action.payload
            };
        case 'GET_USERS':
            return {
                ...state,
                users: action.payload
            };
        case 'REGISTER_USER':
            return {
                ...state,
                users: action.payload.users,
                success: action.payload.success,
                error: action.payload.error
            };
        case 'CLEAR_SUCCESS_STATE':
            return {
                ...state,
                success: action.payload.success,
                error: action.payload.error
            };
        default:
            return state;
    }

}