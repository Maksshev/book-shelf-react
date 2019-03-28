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
import {reviewValidation} from "../forms/validation-config";
import {ValidationFail} from "../forms/error-message";
import {Formik, Form, Field, ErrorMessage} from 'formik';
import FormField from "../forms/form-field";


class EditPost extends Component {

    state = {
        loading: true,
        isUpdating: false,
        showPostStatus: false,
        isDeleted: false
    };


    submitForm = (values) => {
        this.setState({
            isUpdating: true,
            showPostStatus: false
        });
        this.props.dispatch(clearUpdatedBook());
        this.props.dispatch(clearReview());
        this.props.dispatch(updateBook(values));
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
                    <Formik
                        initialValues={this.state.formData}
                        onSubmit={this.submitForm}
                        validationSchema={reviewValidation}
                    >
                        <Form>
                            <h2>Edit review</h2>
                            <Field name="name" type="text" placeholder="Enter book name" component={FormField}/>
                            <ErrorMessage name="name" render={ValidationFail}/>
                            <Field name="author" type="text" placeholder="Enter author's name" component={FormField}/>
                            <ErrorMessage name="author" render={ValidationFail}/>
                            <Field name="review" placeholder="Write book review here" component={(props) => (
                                <textarea {...props.field} placeholder={props.placeholder}/>
                            )}/>
                            <ErrorMessage name="review" render={ValidationFail}/>
                            <Field name="pages" type="number" placeholder="Enter number of pages" component={FormField}/>
                            <ErrorMessage name="pages" render={ValidationFail}/>
                            <Field name="rating" component={(props) => (
                                <div className="form_element">
                                    <select
                                        {...props.field}
                                    >
                                        <option value="">Choose rating</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                    </select>
                                </div>
                            )}/>
                            <ErrorMessage name="rating" render={ValidationFail}/>
                            <Field name="price" type="number" placeholder="Enter book's price" component={FormField}/>
                            <ErrorMessage name="price" render={ValidationFail}/>
                            {this.renderSubmitButton()}
                            {this.renderDeleteButton()}
                        </Form>
                    </Formik>
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