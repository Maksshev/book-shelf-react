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
        error: '',
        loading: false,
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
        this.setState({
            loading: true
        });
        this.props.dispatch(logUser(this.state));
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
                            this.state.error ?
                                <div>{this.state.error}</div>
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
        login: state.userReducer.login,
    }
};

export default connect(mapStateToProps)(withRouter(LoginContainer));