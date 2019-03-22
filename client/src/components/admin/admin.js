import React from 'react';

const Admin = (props) => {

    const user = props.user;
    const name = user.name;
    const lastName = user.lastName;
    const email = user.email;

    return (
        <div className="user_container">
            <div className="avatar">
                <img alt="avatar" src="/images/avatar.png"/>
            </div>
            <div className="nfo">
                <div><span>Name:</span> {name}</div>
                <div><span>Lastname:</span> {lastName}</div>
                <div><span>Email:</span> {email}</div>
            </div>
        </div>
    );
};

export default Admin;
