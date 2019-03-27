import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {clearLogInState} from "../../actions/userActions";


class Logout extends Component {


    componentDidMount() {
        this.props.dispatch(clearLogInState());
    }

    logout = () => {
        axios.get('/api/users/logout')
            .then(() => {
                setTimeout(() => {
                    this.props.history.push('/');
                }, 1500)
            })
    };


    render() {

        this.logout();

        return (
            <div className="logout_container">
                <h1>Good bye!</h1>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        login: state.userReducer.login
    }
};


export default connect(mapStateToProps)(Logout);
