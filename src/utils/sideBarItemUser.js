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
                    title: 'Tài khoản',
                    type: 'collapse',
                    url: '',
                    icon: faUser,
                    children: [
                        {
                            id: 'personal-info',
                            title: 'Thông tin cá nhân',
                            type: 'item',
                            url: '/user/personal-info',
                        },
                        {
                            id: 'password',
                            title: 'Mật khẩu',
                            type: 'item',
                            url: '/user/password',
                        },
                        {
                            id: 'address',
                            title: 'Địa chỉ',
                            type: 'item',
                            url: '/user/address',
                        },
                    ],
                },
                {
                    id: 'order',
                    title: 'Đơn hàng',
                    type: 'collapse',
                    url: '',
                    icon: faUserGroup,
                    children: [
                        {
                            id: 'order-manage',
                            title: 'Quản lý đơn hàng',
                            type: 'item',
                            url: '/user/order-manage',
                        },
                        {
                            id: 'favorite-product',
                            title: 'Sản phẩm yêu thích',
                            type: 'item',
                            url: '/user/favorite-product',
                        },
                        {
                            id: 'purchased-product',
                            title: 'Sản phẩm đã mua',
                            type: 'item',
                            url: '/user/purchased-product',
                        },
                        {
                            id: 'favorite-course',
                            title: 'Khóa học yêu thích',
                            type: 'item',
                            url: '/user/favorite-course',
                        },
                        {
                            id: 'participation-course',
                            title: 'Khóa học đã mua',
                            type: 'item',
                            url: '/user/participation-course',
                        },
                    ],
                },
            ],
        },
    ],
};
