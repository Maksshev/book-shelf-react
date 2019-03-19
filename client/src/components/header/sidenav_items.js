import React from 'react';
import  {Link} from 'react-router-dom';
import FontAwesome from 'react-fontawesome';

const SidenavItems = () => {

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
            restricted: false
        },
        {
            type: 'navItem',
            icon: 'address-card',
            text: 'Add Admins',
            link: '/user/register',
            restricted: false
        },
        {
            type: 'navItem',
            icon: 'sign-in',
            text: 'Login',
            link: '/login',
            restricted: false
        },
        {
            type: 'navItem',
            icon: 'edit',
            text: 'My reviews',
            link: '/user/user-reviews',
            restricted: false
        },
        {
            type: 'navItem',
            icon: 'file-text-o',
            text: 'Add reviews',
            link: '/user/add',
            restricted: false
        },
        {
            type: 'navItem',
            icon: 'sign-out',
            text: 'Logout',
            link: '/user/logout',
            restricted: false
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
            return element(e, i);
        })
    );

    return (
        <div>
            {showItems()}
        </div>
    );
};

export default SidenavItems;
