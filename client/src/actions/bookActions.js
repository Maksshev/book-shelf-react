import axios from 'axios';

export async function getBooks(
    limit = 10,
    start = 0,
    order = 'asc',
    currentlyDisplayedBooks = []
) {
    const req = `/api/books?limit=${limit}&skip=${start}&order=${order}`;
    const requestedBooks = await axios.get(req);

    return {
        type: 'GET_BOOKS',
        payload: [...currentlyDisplayedBooks, ...requestedBooks.data]
    }
}

export function clearBooks() {
    return {
        type: 'CLEAR_BOOKS',
        payload: null
    }
}




export async function getBookWithReviewer(id) {
    const bookDataReq = await axios.get(`/api/books/book?id=${id}`);
    const bookData = bookDataReq.data;
    return async dispatch => {
        const reviewerReq = await axios.get(`/api/users/getReviewer?id=${bookData.ownerId}`);
        const reviewerData = reviewerReq.data;
        dispatch({
            type: 'GET_BOOK_WITH_REVIEWER',
            payload: {
                book: bookData, reviewer: reviewerData
            }
        })
    }
}


export function clearBookWithReviewer() {
    return {
        type: 'CLEAR_BOOK_WITH_REVIEWER',
        payload: {
            book: null,
            reviewer: null
        }
    }
}


export async function addBookReview(bookData) {
    let result;

    try {
        const reviewAddReq = await axios.post('/api/books/book', bookData);
        result = reviewAddReq.data;
    } catch (e) {
        result = {
            post: false
        }
    }

    return {
        type: 'ADD_BOOK_REVIEW',
        payload: {
            ...result
        }
    }
}

export function clearAddBookState() {
    return {
        type: 'CLEAR_ADD_BOOK_STATE',
        payload: null
    }
}

export async function getReview(id) {
    const reviewRequest = await axios.get(`/api/books/book?id=${id}`);

    return {
        type: 'GET_REVIEW_BY_ID',
        payload: {
            ...reviewRequest.data
        }
    }
}

export function clearReview() {
    return {
        type: 'CLEAR_REVIEW',
        payload: null
    }
}

export async function updateBook(bookData) {
    const updateReq = await axios.post('/api/books/book_update', bookData);
    return {
        type: 'UPDATE_BOOK',
        payload: {
            ...updateReq.data
        }
    }
}

export function clearUpdatedBook() {
    return {
        type: 'CLEAR_UPDATED_BOOK',
        payload: null
    }
}


export async function deleteReview(id) {
    const delRequest = await axios.delete(`/api/books/delete_book?id=${id}`);
    return {
        type: 'DELETE_BOOK',
        payload: delRequest.data.deleted
    }
}

export function clearDeleteStatus() {
    return {
        type: 'CLEAR_DELETE_STATUS',
        payload: null
    }
}