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


const component = async (props, Component, redirect) => {
    const isAuth = await authService().checkAuth();

    return              isAuth
                    ? () => Component
                : () => <Redirect to={redirect}/>


};


//todo: add error component

const ManagedRoute = ({component: Component, redirect: redirect, ...rest}) => (
    <Route {...rest} component={asyncComponent({
        resolve: () => component(null, Component, redirect),
        LoadingComponent: () => <div className="loader">Loading...</div>
    })}/>
);


const Routes = () => {
    return (
        <Layout>
            <Switch>
                <Route path="/" exact component={auth(Home, null)}/>
                <Route path="/login" exact component={Login}/>
                {/*<Route path="/login" exact component={auth(Login, false)}/>*/}
                <Route path="/books/:id" exact component={auth(BookView)}/>
                {/*<Route path="/user" exact component={auth(Admin, true)}/>*/}
                <ManagedRoute path="/user" exact component={<Admin/>} redirect="/login"/>
            </Switch>
        </Layout>
    );
};

export default Routes;
