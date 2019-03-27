import React from 'react';
import SideNav from 'react-simple-sidenav';
import SidenavItems from './sidenav_items';
import {asyncComponent} from 'react-async-component';
import authService from "../../services/authService";


const Nav = (props) => {

    const sidenavCheckAuth = async () => {
        const authObj = await authService().checkAuth();
        return () => <SidenavItems isAuth={authObj.isAuth}/>
    };


    const CheckedSideNav = asyncComponent({
        resolve: () => sidenavCheckAuth(),
        LoadingComponent: () => <SidenavItems onClick={props.click} isAuth={!!props.login}/>
    });


    return (
        <SideNav
            showNav={props.showNav}
            onHideNav={props.onHideNav}
            navStyle={{
                position: 'relative',
                background: '#242424',
                maxWidth: '220px',
                zIndex: '1000',
            }}
        >
            <CheckedSideNav/>
        </SideNav>
    );
};

export default React.memo(Nav);
