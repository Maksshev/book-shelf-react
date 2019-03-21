import React, {Component} from 'react';
import {connect} from 'react-redux';
import {checkAuthStatus} from "../actions/userActions";
import {withRouter} from 'react-router-dom';

export default function auth (ComposedComponent, reload) {

    class AuthClass extends Component {

        state = {
            loading: true,
            valera: 'valera'
        };


        componentDidMount() {
            this.props.dispatch(checkAuthStatus());
        }

        static getDerivedStateFromProps(nextProps) {
            if (nextProps.user && nextProps.user.isAuth) {
                if (reload === false) {
                    nextProps.history.push('/user');
                }

            } else {
                if (reload) {
                    nextProps.history.push('/login')
                }
            }


            return {
                loading: false
            };
        }


        render() {

            if (this.state.loading) {
                return <div className="loader">Loading...</div>
            }

            return (
                <ComposedComponent {...this.props}/>
            )
        }
    }

    const mapStateToProps = (state) => {
        return {
            user: state.userReducer.user
        }
    };

    return connect(mapStateToProps)(AuthClass);
}

