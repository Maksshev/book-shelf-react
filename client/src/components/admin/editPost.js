import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link, withRouter} from 'react-router-dom';
import {
    getReview,
    clearReview,
    updateBook,
    clearUpdatedBook,
    deleteReview,
    clearDeleteStatus
} from "../../actions/bookActions";

class EditPost extends Component {

    state = {
        loading: true,
        isUpdating: false,
        showPostStatus: false,
        isDeleted: false
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
            isUpdating: true,
            showPostStatus: false
        });
        this.props.dispatch(clearUpdatedBook());
        this.props.dispatch(clearReview());
        this.props.dispatch(updateBook(this.state.formData));
    };

    showUpdatedReview = () => (
        this.props.updatedBook.update ?
            <div className="edit_confirm">
                Review updated: <Link to={`/books/${this.props.match.params.id}`}>Click here to go to the review</Link>
            </div>
            :
            <div className="error">
                Review can't be added, check required fields
            </div>
    );

    deletePost = () => {
        this.setState({
            isUpdating: true
        });
        this.props.dispatch(deleteReview(this.props.match.params.id));
    };

    redirectToReviews = () => {
        setTimeout(() => {
            this.props.history.push('/user/user-reviews');
        }, 1500)
    };

    showDeletedStatus = () => (
        <div className="red_tag">
            Review Deleted
            {this.redirectToReviews()}
        </div>
    );

    renderSubmitButton = () => (
        this.state.isUpdating ?
            <div className="lds-circle">
                <div></div>
            </div> :
            <button type="submit">Edit review</button>
    );

    renderDeleteButton = () => (
        <div className={`delete_post${ this.state.isUpdating ? ' invisible' : ''}`}>
            <div className="button"
                 onClick={this.deletePost}
            >
                Delete post
            </div>
        </div>
    );


    componentDidMount() {
        if (!this.state.formData) {
            this.props.dispatch(getReview(this.props.match.params.id));
        }
    }


    componentWillUnmount() {
        this.props.dispatch(clearReview());
        this.props.dispatch(clearUpdatedBook());
        this.props.dispatch(clearDeleteStatus());
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.editedBook && !prevState.formData) {
            return {
                formData: {
                    ...nextProps.editedBook
                },
                loading: false
            }
        }

        if (nextProps.updatedBook) {
            return {
                isUpdating: false,
                showPostStatus: true
            }
        }

        if (nextProps.isDeleted) {
            return {
                isUpdating: false,
                isDeleted: true
            }
        }

        return null;
    }

    render() {
        const formData = this.state.formData;

        return formData ? (
                <div className="rl_container article">
                    {this.state.showPostStatus ? this.showUpdatedReview() : null}
                    {this.state.isDeleted ? this.showDeletedStatus() : null}
                    <form onSubmit={this.submitForm}>
                        <h2>Edit review</h2>
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
                        {this.renderDeleteButton()}
                    </form>
                </div>
            )
            :
            <div className="lds-circle">
                <div></div>
            </div>

    }
}

const mapStateToProps = (state) => {
    return {
        editedBook: state.bookReducer.editedBook,
        updatedBook: state.bookReducer.updatedBook,
        isDeleted: state.bookReducer.isDeleted
    }
};

export default connect(mapStateToProps)(withRouter(EditPost));