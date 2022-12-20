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
                    id: 'businesslinfo',
                    title: 'Company Information',
                    type: 'collapse',
                    url: '',
                    icon: faUser,
                    children: [
                        {
                            id: 'package-details',
                            title: 'Package Information',
                            type: 'item',
                            url: '/package-details',
                        },
                    ],
                },
                {
                    id: 'productmanager',
                    title: 'Order Products',
                    type: 'collapse',
                    url: '',
                    icon: faBuilding,
                    children: [
                        {
                            id: 'all-orders',
                            title: 'All orders',
                            type: 'item',
                            url: '/all-orders',
                        },
                        {
                            id: 'cancel-order',
                            title: 'Canceled orders',
                            type: 'item',
                            url: '/cancel-order',
                        },
                        // {
                        //     id: 'transport-manage',
                        //     title: 'Quản lý vận chuyển',
                        //     type: 'item',
                        //     url: '/transport-manage',
                        // },
                        // {
                        //     id: 'marketing-channel',
                        //     title: 'Kênh marketing',
                        //     type: 'item',
                        //     url: '/marketing-channel',
                        // },
                        // {
                        //     id: 'financial',
                        //     title: 'Tài chính',
                        //     type: 'item',
                        //     url: '/financial',
                        // },
                        // {
                        //     id: 'data',
                        //     title: 'Dữ liệu',
                        //     type: 'item',
                        //     url: '/data',
                        // },
                    ],
                },
                {
                    id: 'courses-manage',
                    title: 'Courses Manage',
                    type: 'collapse',
                    url: '',
                    icon: faUserGroup,
                    children: [
                        {
                            id: 'create-course',
                            title: 'Add Course',
                            type: 'item',
                            url: '/businessadmin/createcourse',
                            active: true,
                        },
                        {
                            id: 'list-courses',
                            title: 'Courses List',
                            type: 'item',
                            url: '/businessadmin/listcourses',
                            active: true,
                        },
                    ],
                },
                {
                    id: 'product-manage',
                    title: 'Manage Products',
                    type: 'collapse',
                    url: '',
                    icon: faUserGroup,
                    children: [
                        {
                            id: 'all-product',
                            title: 'All products',
                            type: 'item',
                            url: '/all-products',
                        },
                        {
                            id: 'create-product',
                            title: 'Add product',
                            type: 'item',
                            url: '/businessadmin/create-order',
                        },
                        {
                            id: 'product-error',
                            title: 'Violated Product',
                            type: 'item',
                            url: '/error-products',
                        },
                    ],
                },
                {
                    id: 'marketing-channel-group',
                    title: 'Marketing channel',
                    type: 'collapse',
                    url: '',
                    icon: faUserGroup,
                    children: [
                        {
                            id: 'marketing-channel',
                            title: 'Marketing channel',
                            type: 'item',
                            url: '/marketing-channel',
                        },
                        {
                            id: 'discount-code',
                            title: 'Promotion code',
                            type: 'item',
                            url: '/my-program',
                        },
                    ],
                },
                // {
                //     id: 'financial',
                //     title: 'Tài chính',
                //     type: 'collapse',
                //     url: '',
                //     icon: faUserGroup,
                //     children: [
                //         {
                //             id: 'revenue',
                //             title: 'Doanh thu',
                //             type: 'item',
                //             url: '/businessadmin/createcourse',
                //         },
                //         {
                //             id: 'payment-setting',
                //             title: 'Thiết lập thanh toán',
                //             type: 'item',
                //             url: '/businessadmin/listcourses',
                //         },
                //     ],
                // },
            ],
        },
    ],
};
