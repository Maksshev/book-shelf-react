import React from 'react';

const Admin = (props) => {

    const user = props.user;
    const name = user && user.user ? user.user.name : null;
    const lastName = user && user.user ? user.user.lastName : null;
    const email = user && user.user ? user.user.email : null;

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
