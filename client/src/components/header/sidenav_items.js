import React from 'react';
import  {Link} from 'react-router-dom';
import FontAwesome from 'react-fontawesome';

const SidenavItems = (props) => {


    const items = [
        {
            type: 'navItem',
            icon: 'home',
            text: 'Home',
            link: '/',
            restricted: false
        },
        {
            type: 'navItem',
            icon: 'address-book',
            text: 'My Profile',
            link: '/user',
            restricted: true
        },
        {
            type: 'navItem',
            icon: 'address-card',
            text: 'Add Admins',
            link: '/user/register',
            restricted: true
        },
        {
            type: 'navItem',
            icon: 'sign-in',
            text: 'Login',
            link: '/login',
            restricted: false,
            excluded: true
        },
        {
            type: 'navItem',
            icon: 'edit',
            text: 'My reviews',
            link: '/user/user-reviews',
            restricted: true
        },
        {
            type: 'navItem',
            icon: 'file-text-o',
            text: 'Add reviews',
            link: '/user/add',
            restricted: true
        },
        {
            type: 'navItem',
            icon: 'sign-out',
            text: 'Logout',
            link: '/user/logout',
            restricted: true
        },
    ];

    const element = (element, key) => (
        <div key={key} className={element.type}>
            <Link to={element.link}>
                <FontAwesome name={element.icon}/>
                {element.text}
            </Link>
        </div>
    );

    const showItems = () => (
        items.map((e, i) => {
            if (props.isAuth) {
                if (!e.excluded) {
                    return element(e, i);
                }
                return null;
            } else {
                if (!e.restricted) {
                    return element(e, i);
                }
                return null;
            }
        })
    );

    return (
        <div>
            {showItems()}
        </div>
    );
};

export default SidenavItems;
