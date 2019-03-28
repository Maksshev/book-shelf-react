import React, {Component} from 'react';
import {connect} from 'react-redux';
import {logUser} from "../actions/userActions";
import {withRouter} from 'react-router-dom';
import {clearLogInState} from "../actions/userActions";
import FormField from "../components/forms/form-field";
import {initLoginValues} from "../components/forms/init-values-config";
import {loginValidation} from "../components/forms/validation-config";
import {ValidationFail} from "../components/forms/error-message";
import {Formik, Form, Field, ErrorMessage} from 'formik';

class LoginContainer extends Component {

    state = {
        error: '',
        loading: false,
    };


    submitForm = (values) => {
        this.setState({
            loading: true
        });
        this.props.dispatch(logUser(values));
    };


    static getDerivedStateFromProps(nextProps) {
        if (nextProps.login && typeof nextProps.login.isAuth === 'boolean') {

            if (nextProps.login.isAuth) {
                nextProps.history.push('/');
                return null;
            }

            const error = nextProps.login.message;
            nextProps.dispatch(clearLogInState());
            return {
                loading: false,
                error
            }
        }
        return null;
    }


    render() {

        return this.state.loading ?

            <div className="loader">Loading...</div>

            :

            (
                <div className="rl_container">

                    <Formik
                        initialValues={initLoginValues}
                        onSubmit={this.submitForm}
                        validationSchema={loginValidation}
                    >
                        <Form>
                            <h2>Log in</h2>
                            <Field name="email" type="text" placeholder="Enter your email" component={FormField}/>
                            <ErrorMessage name="email" render={ValidationFail}/>
                            <Field name="password" type="password" placeholder="Enter your password" component={FormField}/>
                            <ErrorMessage name="password" render={ValidationFail}/>
                            <button type="submit">
                            Log in
                            </button>
                            <div className="error">
                            {
                            this.state.error ?
                            <div>{this.state.error}</div>
                            :
                            null
                            }
                            </div>
                        </Form>
                    </Formik>
                </div>
            )
    }
}

const mapStateToProps = (state) => {
    return {
        login: state.userReducer.login,
    }
};

export default connect(mapStateToProps)(withRouter(LoginContainer));