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

export async function getUsers() {
    const usersRequest = await axios.get('/api/users');
    return {
        type: 'GET_USERS',
        payload: usersRequest.data
    }
}


export async function registerUser(userData, usersList) {
    try {
        const registerRequest = await axios.post('/api/users/register', userData);
        const addedUserData = registerRequest.data;
        return {
            type: 'REGISTER_USER',
            payload: {users: [...usersList, addedUserData.addedUser], success: addedUserData.success}
        }
    } catch (e) {
        return {
            type: 'REGISTER_USER',
            payload: {users: [...usersList], success: false, error: 'Something went wrong, try again'}
        }
    }
}

export function clearSuccessState() {
    return {
        type: 'CLEAR_SUCCESS_STATE',
        payload: {
            success: undefined,
            error: undefined
        }
    }
}







