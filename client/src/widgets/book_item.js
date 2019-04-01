import React from 'react';
import {Link} from 'react-router-dom';

const BookItem = (book) => {
    return (
        <Link to={`books/${book._id}`} className="book_item">
            <div className="book_header">
                <h2>
                    {book.name}
                </h2>
                <div className="book_items">
                    <div className="book_author">
                        {book.author}
                    </div>
                    <div className="book_bubble">
                        <strong>Price</strong> {'$' + book.price}
                    </div>
                    <div className="book_bubble">
                        <strong>Pages</strong> {book.pages}
                    </div>
                    <div className="book_bubble rating">
                        <strong>Rating</strong> {book.rating}
                    </div>
                </div>
                {book.cover && <img className="book-cover-item" src={book.cover} alt="no cover"/>}
            </div>
        </Link>
    );
};

export default BookItem;
