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