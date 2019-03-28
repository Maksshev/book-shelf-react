import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getUsers, registerUser, clearSuccessState} from "../../actions/userActions";
import {registerValidation} from "../forms/validation-config";
import {Formik, Form, Field, ErrorMessage} from 'formik';
import FormField from "../forms/form-field";
import {ValidationFail} from "../forms/error-message";


class RegisterUser extends Component {

    state = {
        formData: {
            name: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: ''
        },
        error: '',
        loading: false,
        showAddedStatus: false
    };


    componentDidMount() {
        this.props.dispatch(getUsers());
    }


    componentWillUnmount() {
        this.props.dispatch(clearSuccessState());
    }


    static getDerivedStateFromProps(nextProps) {
        if (nextProps.success !== undefined) {
            if (nextProps.success) {
                nextProps.dispatch(clearSuccessState());
                return {
                    formData: {
                        name: '',
                        lastName: '',
                        email: '',
                        password: ''
                    },
                    loading: false,
                    error: nextProps.error,
                    showAddedStatus: true
                }
            } else {
                return {
                    loading: false,
                    error: nextProps.error,
                    showAddedStatus: false
                }
            }
        }
        return null;
    }


    submitForm = values => {
        this.setState({
            loading: true
        });
        this.props.dispatch(clearSuccessState());
        this.props.dispatch(registerUser({name: values.name, lastName: values.lastName, email: values.email, password: values.password}, this.props.users));
    };



    showUsers = (users) => (
        users.map(user => (
            <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
            </tr>
        ))
    );

    render() {

        const users = this.props.users;



        return (

            users ?

            <div className="rl_container">
                {this.state.showAddedStatus ?
                    <div className="edit_confirm">
                        User added!
                    </div>

                    :

                    null
                }

                <Formik
                    initialValues={this.state.formData}
                    onSubmit={this.submitForm}
                    validationSchema={registerValidation}
                >

                    <Form>
                        <h2>Add user</h2>
                        <Field name="name" type="text" placeholder="Enter name" component={FormField}/>
                        <ErrorMessage name="name" render={ValidationFail}/>
                        <Field name="lastName" type="text" placeholder="Enter last name" component={FormField}/>
                        <ErrorMessage name="lastName" render={ValidationFail}/>
                        <Field name="email" type="text" placeholder="Enter email" component={FormField}/>
                        <ErrorMessage name="email" render={ValidationFail}/>
                        <Field name="password" type="password" placeholder="Enter password" component={FormField}/>
                        <ErrorMessage name="password" render={ValidationFail}/>
                        <Field name="confirmPassword" type="password" placeholder="Confirm password" component={FormField}/>
                        <ErrorMessage name="confirmPassword" render={ValidationFail}/>
                        {this.state.loading? <div className="lds-circle"><div></div></div> : <button type="submit">Add user</button>}
                        <div className="error">
                        {this.state.error}
                        </div>
                    </Form>

                </Formik>


                <div className="current_users">
                    <h4>
                        Current users:
                    </h4>
                    <table>
                        <thead>
                        <tr>
                            <th>
                                Name
                            </th>
                            <th>
                                Last name
                            </th>
                            <th>
                                Email
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.showUsers(users)}
                        </tbody>
                    </table>
                </div>
            </div>

                :

                <div className="lds-circle"><div></div></div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        users: state.userReducer.users,
        success: state.userReducer.success,
        error: state.userReducer.error
    }
};

export default connect(mapStateToProps)(RegisterUser);