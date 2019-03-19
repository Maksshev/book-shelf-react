import React from 'react';
import BookContainer from "../../containers/book_container";

const BookView = (props) => {
    return (
        <div>
            <BookContainer id={props.match.params.id}/>
        </div>
    );
};

export default BookView;
