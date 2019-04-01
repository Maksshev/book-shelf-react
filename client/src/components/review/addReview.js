import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {addBookReview, clearAddBookState} from "../../actions/bookActions";
import {initReviewAddingValues} from "../forms/init-values-config";
import {reviewValidation} from "../forms/validation-config";
import {ValidationFail} from "../forms/error-message";
import {Formik, Form, Field, ErrorMessage} from 'formik';
import FormField from "../forms/form-field";
import axios from 'axios';

class AddReview extends Component {

    state = {
        loading: false,
        showPostStatus: false,
        postStatus: false,
        SUPPORTED_FORMATS: ['image/jpg', 'image/jpeg', 'image/png'],

    };

    submitForm = (values) => {
        this.setState({
            loading: true,
        });

        const reviewData = {
            name: values.name,
            author: values.author,
            review: values.review,
            rating: values.rating,
            price: values.price,
            ownerId: this.props.user._id,
            pages: values.pages,
            cover: values.imageString
        };

        this.props.dispatch(addBookReview(reviewData));
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
            <div className="lds-circle">
                <div></div>
            </div> :
            <button type="submit">Add review</button>
    );

    handleImageInputChange = (e, props) => {

        props.form.setFieldValue('imageString', '');

        const file = e.currentTarget.files[0];
        props.form.setFieldValue('image', file, true);
        if (file && file.size < 100000 && this.state.SUPPORTED_FORMATS.includes(file.type)) {
            const formData = new FormData();
            formData.append('cover', file);
            axios({
                method: 'post',
                url: '/api/books/cover',
                data: formData,
                config: {headers: {'Content-Type': 'multipart/form-data'}}
            })
                .then(function (response) {
                    //handle success
                    console.log(response);
                    props.form.setFieldValue('imageString', response.data.image);
                })
                .catch(function (response) {
                    //handle error
                    console.log(response);
                })
        }

    };

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

        return (
            <div className="rl_container article">

                <Formik
                    initialValues={initReviewAddingValues}
                    onSubmit={this.submitForm}
                    validationSchema={reviewValidation}
                >


                    <Form>
                        <h2>Add review</h2>
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
                                    className={props.form.values.rating || 'rating-select'}
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
                        <Field name="image" placeholder="Upload book cover" component={(props) => {


                            return (

                                <React.Fragment>
                                    <div className="upload-btn-wrapper">
                                        <button className="upload-btn">Upload cover</button>
                                        <input type="file"
                                               name="image"
                                               onChange={e => this.handleImageInputChange(e, props)}
                                               onBlur={(e) => {
                                                   props.form.setFieldTouched('image', true, true)
                                               }}
                                        />
                                    </div>


                                    {props.form.values.imageString &&
                                    <img className="book-cover" src={props.form.values.imageString} alt="error"/>}


                                </React.Fragment>
                            )
                        }}/>
                        <Field name="imageString" type="hidden"/>
                        <ErrorMessage name="image" render={ValidationFail}/>
                        <Field name="price" type="number" placeholder="Enter book's price" component={FormField}/>
                        <ErrorMessage name="price" render={ValidationFail}/>
                        {this.renderSubmitButton()}
                        <ErrorMessage name="imageString" render={ValidationFail}/>
                    </Form>


                </Formik>

                {
                    this.state.showPostStatus ?
                        this.showNewBook(this.props.newBook) :
                        <div className="conf_link invisible">
                            Review added: Click here to go to the review
                        </div>
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