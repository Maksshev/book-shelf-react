import * as Yup from 'yup';

export const loginValidation = Yup.object().shape({
    email: Yup.string().email('Please, enter valid email').required('Email is required'),
    password: Yup.string().min(6, 'Password is to short').max(10, 'Password is two long').required('Password is required')
});

export const reviewValidation = Yup.object().shape({
    name: Yup.string().required('Book name is required'),
    author: Yup.string().matches(/^([^0-9]*)$/, 'Author\'s name must not contain numbers').required('Author\'s name is required'),
    review: Yup.string().matches(/(.){100,}/, 'Review must contain at least 100 characters').required('Review text is required'),
    pages: Yup.number().min(1, 'A book must contain at least one page').max(100000, 'The book is two big :)').required('Number of pages is required'),
    rating: Yup.number().min(1, 'Rating must be in range from 1 to five').max(5, 'Rating must be in range from one to five').required('Rating is required'),
    price: Yup.number().min(0, 'Enter correct price').max(1000000, 'The price is two big :)').required('Price is required')
});