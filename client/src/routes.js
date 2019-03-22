import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import Home from './components/home/home';
import Layout from "./hoc/layout";
import BookView from "./components/book/book";
import Login from "./components/login/login";
import auth from './hoc/auth';
import Admin from "./components/admin/admin";
import {asyncComponent} from 'react-async-component';
import authService from './services/authService';


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

const ManagedRoute = ({component: Component, redirect: redirect, type: type, ...rest}) => (
    <Route {...rest} component={asyncComponent({
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
                <Route path="/books/:id" exact component={auth(BookView)}/>
                <ManagedRoute path="/user" exact component={Admin} type="user" redirect="/login"/>
            </Switch>
        </Layout>
    );
};

export default Routes;
