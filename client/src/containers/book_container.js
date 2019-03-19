import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getBookWithReviewer, clearBookWithReviewer} from "../actions/actions";

class BookContainer extends Component {


    componentDidMount() {
        this.props.dispatch(getBookWithReviewer(this.props.id));
    }


    componentWillUnmount() {
        this.props.dispatch(clearBookWithReviewer());
    }


    //todo: change to pages when db is ready


    renderBook = (book, reviewer) => (
        book ?
            <div className="br_container">
                <div className="br_header">
                    <h2>
                        {book.name}
                    </h2>
                    <h5>
                        {book.author}
                    </h5>
                    <div className="br_reviewer">
                        <span>Review by:</span> {reviewer.name} {reviewer.lastName}
                    </div>
                </div>
                <div className="br_review">
                    {book.review}
                </div>
                <div className="br_box">
                    <div className="left">
                        <div>
                            <span>Pages:</span> {book.price}
                        </div>
                        <div>
                            <span>Price: </span> {book.price}
                        </div>
                    </div>
                    <div className="right">
                        <span>Rating</span>
                        <div>
                            {book.rating + '/5'}
                        </div>
                    </div>
                </div>
            </div>
            :
            null
    );


    render() {

        const book = this.props.book;
        const reviewer = this.props.reviewer;


        return (
            <div>
                {this.renderBook(book, reviewer)}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        ...state.bookReducer
    }
};

export default connect(mapStateToProps)(BookContainer);