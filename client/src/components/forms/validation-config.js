import * as Yup from 'yup';

const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png'];

export const loginValidation = Yup.object().shape({
    email: Yup.string().email('Please, enter valid email').required('Email is required'),
    password: Yup.string().min(6, 'Password is to short').max(50, 'Password is two long').required('Password is required')
});

export const reviewValidation = Yup.object().shape({
    name: Yup.string().required('Book name is required'),
    author: Yup.string().matches(/^([^0-9]*)$/, 'Author\'s name must not contain numbers').required('Author\'s name is required'),
    review: Yup.string().matches(/(.){100,}/, 'Review must contain at least 100 characters').required('Review text is required'),
    pages: Yup.number().min(1, 'A book must contain at least one page').max(100000, 'The book is two big :)').required('Number of pages is required'),
    rating: Yup.number().min(1, 'Rating must be in range from 1 to five').max(5, 'Rating must be in range from one to five').required('Rating is required'),
    price: Yup.number().min(0, 'Enter correct price').max(1000000, 'The price is two big :)').required('Price is required'),
    image: Yup.mixed().test('fileExists', "Book cover is required", value => !!value).test('fileSize', "Max image size is 500kb", value => value ? value.size <= 500000 : false).test('fileType', "Unsupported file format, should be .jpg or .png", value => value ? SUPPORTED_FORMATS.includes(value.type) : false),
    imageString: Yup.string().required("Book cover hasn't been loaded yet")
});

export const registerValidation = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    lastName: Yup.string().required('Last name is required'),
    email: Yup.string().email('Please, enter valid email').required('Email is required'),
    password: Yup.string().min(6, 'Password is to short').max(50, 'Password is two long').required('Password is required'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords do not match').required('Password confirmation is required')
});


