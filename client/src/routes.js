import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import Home from './components/home/home';
import Layout from "./hoc/layout";
import BookView from "./components/book/book";
import Login from "./components/login/login";
import Admin from "./components/admin/admin";
import {asyncComponent} from 'react-async-component';
import authService from './services/authService';
import AddReview from "./components/review/addReview";
import UserPosts from "./components/admin/userPosts";
import EditPost from './components/admin/editPost';
import RegisterUser from './components/admin/register';
import Logout from "./components/admin/logout";


const component = async (props, Component, redirect, type) => {
    const authObj = await authService().checkAuth();
    let condition;

    const user = authObj.user;

    switch (type) {
        case 'user':
            condition = authObj.isAuth;
            break;
        case 'login':
            condition = !authObj.isAuth;
            break;
        default:
            throw new Error('Type of component must be valid');
    }

    return              condition
                    ? () => <Component user={user}/>
                : () => <Redirect to={redirect}/>


};


//todo: add error component

const ManagedRoute = ({component: Component, redirect, type, ...rest}) => (
    <Route {...rest} exact component={asyncComponent({
        resolve: () => component(null, Component, redirect, type),
        LoadingComponent: () => <div className="loader">Loading...</div>
    })}/>
);


const Routes = () => {
    return (
        <Layout>
            <Switch>
                <Route path="/" exact component={Home}/>
                <ManagedRoute path="/login" exact component={Login} type="login" redirect="/"/>
                <Route path="/books/:id" exact component={BookView}/>
                <ManagedRoute path="/user" exact component={Admin} type="user" redirect="/login"/>
                <ManagedRoute path="/user/add" exact component={AddReview} type="user" redirect="/login"/>
                <ManagedRoute path="/user/user-reviews" exact component={UserPosts} type="user" redirect="/login"/>
                <ManagedRoute path="/user/edit-post/:id" exact component={EditPost} type="user" redirect="/login"/>
                <ManagedRoute path="/user/register" exact component={RegisterUser} type="user" redirect="/login"/>
                <Route path="/user/logout" exact component={Logout}/>
            </Switch>
        </Layout>
    );
};

export default Routes;
