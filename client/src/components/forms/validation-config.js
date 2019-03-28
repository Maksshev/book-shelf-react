import * as Yup from 'yup';

export const loginValidation = Yup.object().shape({
    email: Yup.string().email('Please, enter valid email').required('Email is required'),
    password: Yup.string().min(6, 'Password is to short').max(10, 'Password is two long').required('Password is required')
});