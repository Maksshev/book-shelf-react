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




