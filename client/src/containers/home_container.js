import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getBooks, clearBooks} from "../actions/bookActions";
import BookItem from "../widgets/book_item";

class HomeContainer extends Component {

    state = {
        loading: true,
        booksLength: 0,
        showLoadMore: true,
        updateState: false
    };

    componentDidMount() {
        this.props.dispatch(getBooks(3, 0, 'asc'));
    }


    componentWillUnmount() {
        this.props.dispatch(clearBooks());
        this.setState({updateState: false})
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
                updateState: !prevState.updateState
            }
        }


        if (!nextProps.books) {
            return null;
        }

        if (nextProps.books.length <= prevState.booksLength && prevState.updateState % 2 === 0) {
            return {
                showLoadMore: false
            }
        }

        return {
            updateState: !prevState.updateState
        };
    }


    render() {
        return (
            <div>
                {this.renderBooks(this.props.books)}
                <div
                    className={this.state.showLoadMore ? (this.state.loading ? "lds-circle" : "loadmore") : "hide-load-more"}
                    onClick={this.state.loading ? null : this.loadMore}
                >
                    <div>{this.state.loading ? null : 'Load more'}</div>
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