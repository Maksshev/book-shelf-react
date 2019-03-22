import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getBooks, clearBooks} from "../actions/bookActions";
import BookItem from "../widgets/book_item";

class HomeContainer extends Component {

    state = {
        loading: true,
        booksLength: 0,
        showLoadMore: true,
        updateCounter: 0
    };

    componentDidMount() {
        this.props.dispatch(getBooks(3, 0, 'asc'));
    }


    componentWillUnmount() {
        this.props.dispatch(clearBooks());
        this.setState({updateCounter: 0})
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
        this.setState({loading: true});
    };

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.books && nextProps.books.length > prevState.booksLength) {
            return {
                loading: false,
                booksLength: nextProps.books.length,
                updateCounter: ++prevState.updateCounter
            }
        }


        if (!nextProps.books) {
            return null;
        }

        if (nextProps.books.length <= prevState.booksLength && prevState.updateCounter % 2 === 0) {
            return {
                showLoadMore: false
            }
        }

        return {
            updateCounter: ++prevState.updateCounter
        };
    }


    render() {

        const className = this.state.loading? "loader" : "loadmore";

        return (
            <div>
                {this.renderBooks(this.props.books)}
                <div
                    className={this.state.showLoadMore ? (this.state.loading ? "loader" : "loadmore") : "hide-load-more"}
                    onClick={this.state.loading ? null : this.loadMore}
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