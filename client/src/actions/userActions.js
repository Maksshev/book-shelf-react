import axios from 'axios';

export async function logUser({email, password}) {
    const logRequest = await axios.post('/api/users/login', {email, password});
    return {
        type: 'USER_LOG_IN',
        payload: logRequest.data
    }
}

export async function checkAuthStatus() {
    const isAuthRequest = await axios.get('/api/users/auth');
    return {
        type: 'CHECK_USER_AUTH_STATUS',
        payload: {...isAuthRequest.data}
    }
}

export function clearLogInState() {
    return {
        type: 'CLEAR_USER_LOGIN',
        payload: null
    }
}


export async function getBooksByReviewer(ownerId) {
    const reviewsRequest = await axios.get(`/api/books/reviews`, {params: {ownerId}});
    return {
        type: 'GET_REVIEWS_BY_USER',
        payload: reviewsRequest.data
    }
}




