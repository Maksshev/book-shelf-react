import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Home from './components/home/home';
import Layout from "./hoc/layout";
import BookView from "./components/book/book";

const Routes = () => {
    return (
        <Layout>
            <Switch>
                <Route path="/" exact component={Home}/>
                <Route path="/books/:id" exact component={BookView}/>
            </Switch>
        </Layout>
    );
};

export default Routes;
