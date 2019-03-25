import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {addBookReview, clearAddBookState} from "../../actions/bookActions";

class AddReview extends Component {

    state ={
        formData: {
            name: '',
            author: '',
            review: '',
            pages: '',
            rating: '1',
            price: ''
        },
        loading: false,
        showPostStatus: false,
        postStatus: false
    };

    handleInput = (e, type) => {
        let newFormData = {...this.state.formData};
        newFormData[type] = e.target.value;
        this.setState({
            formData: newFormData
        })
    };

    submitForm = (e) => {
        e.preventDefault();
        this.setState({
            loading: true,
        });
        this.props.dispatch(addBookReview({...this.state.formData, ownerId: this.props.user._id}));
    };

    showNewBook = () => (
        this.state.newBook.post ?
            <div className="conf_link">
                Review added: <Link to={`/books/${this.state.newBook.bookId}`}>Click here to go to the review</Link>
            </div>
            :
            <div className="error">
                Review can't be added, check required fields
            </div>
    );

    renderSubmitButton = () => (
        this.state.loading ?
            <div className="lds-circle"><div></div></div> :
            <button type="submit">Add review</button>
    );

    componentWillUnmount() {
        this.props.dispatch(clearAddBookState())
    }

    static getDerivedStateFromProps(nextProps) {
        if (nextProps.newBook) {
            const newBook = nextProps.newBook;
            nextProps.dispatch(clearAddBookState());
            return {
                showPostStatus: true,
                newBook,
                loading: false
            };
        }
        return null;
    }

    render() {
        const formData = this.state;
        console.log(this.props);

        return (
            <div className="rl_container article">
                <form onSubmit={this.submitForm}>
                    <h2>Add review</h2>
                    <div className="form_element">
                        <input type="text"
                               placeholder="Enter name"
                               value={formData.name}
                               onChange={e => this.handleInput(e, 'name')}
                        />
                    </div>
                    <div className="form_element">
                        <input type="text"
                               placeholder="Enter author"
                               value={formData.author}
                               onChange={e => this.handleInput(e, 'author')}
                        />
                    </div>
                    <textarea
                        value={formData.review}
                        onChange={e => this.handleInput(e, 'review')}
                    />
                    <div className="form_element">
                        <input type="number"
                               placeholder="Enter number of pages"
                               value={formData.pages}
                               onChange={e => this.handleInput(e, 'pages')}
                        />
                    </div>
                    <div className="form_element">
                        <select value={formData.rating}
                                onChange={e => this.handleInput(e, 'rating')}
                        >
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </div>
                    <div className="form_element">
                        <input type="number"
                               placeholder="Enter price"
                               value={formData.price}
                               onChange={e => this.handleInput(e, 'price')}
                        />
                    </div>
                    {this.renderSubmitButton()}
                </form>
                {
                    this.state.showPostStatus ?
                        this.showNewBook(this.props.newBook) :
                        null
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        newBook: state.bookReducer.newBook
    }
};

export default connect(mapStateToProps)(AddReview);