import React, {Component} from 'react';
import {connect} from 'react-redux';
import {logUser} from "../actions/userActions";
import {withRouter} from 'react-router-dom';
import {clearLogInState} from "../actions/userActions";

class LoginContainer extends Component {

    state = {
        email: '',
        password: '',
        success: false,
        error: ''
    };

    handleInputEmail = (e) => {
        this.setState({
            email: e.target.value
        })
    };

    handleInputPassword = (e) => {
        this.setState({
            password: e.target.value
        })
    };

    submitForm = (e) => {
        e.preventDefault();
        this.props.dispatch(logUser(this.state));
    };

    static getDerivedStateFromProps(nextProps) {
        if (nextProps.login && nextProps.login.isAuth) {
            //todo: delete dispatch later on in order to redirect to user on isAuth: true
            nextProps.dispatch(clearLogInState());
            nextProps.history.push('/user');
            return null;
        }
        return null;
    }

    render() {

        const user = this.props;

        return (
            <div className="rl_container">
                <form onSubmit={this.submitForm}>
                    <h2>Log in</h2>
                    <div className="form_element">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            onChange={this.handleInputEmail}
                        />
                    </div>
                    <div className="form_element">
                        <input
                            type="password"
                            placeholder="Enter your password"
                            onChange={this.handleInputPassword}
                        />
                    </div>
                    <button type="submit">
                        Log in
                    </button>
                    <div className="error">
                        {
                            user.login ?
                                <div>{user.login.message}</div>
                                :
                                null
                        }
                    </div>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        login: state.userReducer.login
    }
};

export default connect(mapStateToProps)(withRouter(LoginContainer));