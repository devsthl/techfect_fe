import { faBuilding, faUser, faUserGroup } from '@fortawesome/free-solid-svg-icons';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    items: [
        {
            id: 'dashboard',
            type: 'group',
            icon: '',
            children: [
                {
                    id: 'account',
                    title: 'Account',
                    type: 'collapse',
                    url: '',
                    icon: faUser,
                    children: [
                        {
                            id: 'personal-info',
                            title: 'Personal Information',
                            type: 'item',
                            url: '/user/personal-info',
                        },
                        {
                            id: 'password',
                            title: 'Password',
                            type: 'item',
                            url: '/user/password',
                        },
                        {
                            id: 'address',
                            title: 'Address',
                            type: 'item',
                            url: '/user/address',
                        },
                    ],
                },
                {
                    id: 'order',
                    title: 'Order',
                    type: 'collapse',
                    url: '',
                    icon: faUserGroup,
                    children: [
                        {
                            id: 'order-manage',
                            title: 'Manage Order',
                            type: 'item',
                            url: '/user/order-manage',
                        },
                        {
                            id: 'favorite-product',
                            title: 'Favorite Products',
                            type: 'item',
                            url: '/user/favorite-product',
                        },
                        {
                            id: 'purchased-product',
                            title: 'Purchased Products',
                            type: 'item',
                            url: '/user/purchased-product',
                        },
                        {
                            id: 'favorite-course',
                            title: 'Favorite Courses',
                            type: 'item',
                            url: '/user/favorite-course',
                        },
                        {
                            id: 'participation-course',
                            title: 'Purchased Courses',
                            type: 'item',
                            url: '/user/participation-course',
                        },
                    ],
                },
            ],
        },
    ],
};
