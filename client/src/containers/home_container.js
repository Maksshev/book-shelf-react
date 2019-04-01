import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getBooks, searchBooks, clearBooks} from "../actions/bookActions";
import BookItem from "../widgets/book_item";
import FontAwesome from 'react-fontawesome';

class HomeContainer extends Component {

    state = {
        loading: true,
        booksLength: 0,
        showLoadMore: true,
        updateState: false,
        showSearch: false,
        searchInput: '',
        makeSearchReq: false,
        isSearchResult: false
    };

    componentDidMount() {
        this.props.dispatch(getBooks(10, 0, 'asc'));
    }


    componentWillUnmount() {
        this.props.dispatch(clearBooks());
        this.setState({updateState: false})
    }


    renderBooks = (books) => (
        books ?

            (
                books.length > 0 ?

                books.map((book) => (
                <BookItem key={book._id} {...book}/>
            ))

                :

                <div className="not-found">Nothing was found</div>
            )


            :
            null
    );

    loadMore = () => {
        const count = this.props.books.length;
        this.props.dispatch(getBooks(10, count, 'asc', this.props.books));
        this.setState({loading: true});
    };


    showSearch = () => {
        if (this.state.showSearch) {
            this.props.dispatch(clearBooks());
            this.setState({
                loading: true,
                booksLength: 0,
                showLoadMore: true,
                updateState: false,
                showSearch: false,
                searchInput: '',
                makeSearchReq: false,
                isSearchResult: false
            });
            this.props.dispatch(getBooks(10, 0, 'asc'));
        }
        this.setState({showSearch: !this.state.showSearch});
    };

    handleSearchInput = (e) => {

        const value = e.target.value;

        if (this.state.searchTimeout) clearTimeout(this.state.searchTimeout);

        this.setState({
            loading: true,
            searchInput: value,
            searchTimeout: setTimeout(() => {if (value) this.props.dispatch(searchBooks(value, 10, 0))}, 700)
    });

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

        if (nextProps.books.length === prevState.booksLength && !prevState.updateState) {
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
                <div className="search">
                    <FontAwesome
                        name="search"
                        onClick={this.showSearch}
                    />
                </div>



                    <form onSubmit={(e) => e.preventDefault()} className={`search-form${this.state.showSearch ? ' search-form-open' : ''}`}>
                        <input value={this.state.searchInput} onChange={this.handleSearchInput} className="search-input" type="text" placeholder="Search by book name"/>
                        <div className="close-search" onClick={this.showSearch}>X</div>
                    </form>


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