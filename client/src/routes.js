import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Home from './components/home/home';
import Layout from "./hoc/layout";
import BookView from "./components/book/book";
import Login from "./components/login/login";
import auth from './hoc/auth';
import Admin from "./components/admin/admin";


const Routes = () => {
    return (
        <Layout>
            <Switch>
                <Route path="/" exact component={auth(Home, null)}/>
                <Route path="/login" exact component={auth(Login, false)}/>
                <Route path="/books/:id" exact component={auth(BookView)}/>
                <Route path="/user" exact component={auth(Admin, true)}/>
            </Switch>
        </Layout>
    );
};

export default Routes;
