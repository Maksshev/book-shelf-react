import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getUsers, registerUser, clearSuccessState} from "../../actions/userActions";


class RegisterUser extends Component {

    state = {
        formData: {
            name: '',
            lastName: '',
            email: '',
            password: ''
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


    handleInput = (e, type) => {
        let newFormData = {...this.state.formData};
        newFormData[type] = e.target.value;
        this.setState({
            formData: newFormData
        })
    };

    submitForm = e => {
        e.preventDefault();
        this.setState({
            loading: true
        });
        console.log(this.state.formData);
        this.props.dispatch(clearSuccessState());
        this.props.dispatch(registerUser(this.state.formData, this.props.users));
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

        console.log(this.state.formData)

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
                <form onSubmit={this.submitForm}>
                    <h2>Add user</h2>
                    <div className="form_element">
                        <input type="text"
                               placeholder="Enter name"
                               value={this.state.formData.name}
                               onChange={(e) => this.handleInput(e, "name")}
                        />
                    </div>
                    <div className="form_element">
                        <input type="text"
                               placeholder="Enter last name"
                               value={this.state.formData.lastName}
                               onChange={(e) => this.handleInput(e, "lastName")}
                        />
                    </div>
                    <div className="form_element">
                        <input type="email"
                               placeholder="Enter email"
                               value={this.state.formData.email}
                               onChange={(e) => this.handleInput(e, "email")}
                        />
                    </div>
                    <div className="form_element">
                        <input type="password"
                               placeholder="Enter password"
                               value={this.state.formData.password}
                               onChange={(e) => this.handleInput(e, "password")}
                        />
                    </div>
                    {this.state.loading? <div className="lds-circle"><div></div></div> : <button type="submit">Add user</button>}
                    <div className="error">
                        {this.state.error}
                    </div>
                </form>
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