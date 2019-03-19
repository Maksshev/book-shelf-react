import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getBooks} from "../actions/actions";
import BookItem from "../widgets/book_item";

class HomeContainer extends Component {

    componentDidMount() {
        this.props.dispatch(getBooks(3, 0, 'asc'));
    }

    renderBooks = (books) => (
        books ?
            books.map((book) => (
                <BookItem key={book._id} {...book}/>
            ))
            :
            null
    );

    loadMore = () => {
        const count = this.props.books.length;
        this.props.dispatch(getBooks(3, count, 'asc', this.props.books));
    };


    render() {

        return (
            <div>
                {this.renderBooks(this.props.books)}
                <div
                    className="loadmore"
                    onClick={this.loadMore}
                >
                    Load more
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        books: state.bookReducer.books
    }
}





export default connect(mapStateToProps)(HomeContainer);