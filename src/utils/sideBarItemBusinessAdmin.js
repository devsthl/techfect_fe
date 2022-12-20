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
                    title: 'Thông tin doanh nghiệp',
                    type: 'collapse',
                    url: '',
                    icon: faUser,
                    children: [
                        {
                            id: 'package-details',
                            title: 'Thông tin gói',
                            type: 'item',
                            url: '/package-details',
                            active: true,
                        },
                    ],
                },
                {
                    id: 'productmanager',
                    title: 'Quản lý đơn hàng',
                    type: 'collapse',
                    url: '',
                    icon: faBuilding,
                    children: [
                        {
                            id: 'all-orders',
                            title: 'Tất cả đơn hàng',
                            type: 'item',
                            url: '/all-orders',
                            active: true,
                        },
                        {
                            id: 'cancel-order',
                            title: 'Đơn hủy',
                            type: 'item',
                            url: '/cancel-order',
                            active: true,
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
                    title: 'Quản lý khóa học',
                    type: 'collapse',
                    url: '',
                    icon: faUserGroup,
                    children: [
                        {
                            id: 'create-course',
                            title: 'Thêm khóa học',
                            type: 'item',
                            url: '/businessadmin/createcourse',
                            active: true,
                        },
                        {
                            id: 'list-courses',
                            title: 'Danh sách khóa học',
                            type: 'item',
                            url: '/businessadmin/listcourses',
                            active: true,
                        },
                    ],
                },
                {
                    id: 'product-manage',
                    title: 'Quản lý sản phẩm',
                    type: 'collapse',
                    url: '',
                    icon: faUserGroup,
                    children: [
                        {
                            id: 'all-product',
                            title: 'Tất cả sản phẩm',
                            type: 'item',
                            url: '/all-products',
                            active: true,
                        },
                        {
                            id: 'create-product',
                            title: 'Thêm sản phẩm',
                            type: 'item',
                            url: '/businessadmin/create-order',
                            active: true,
                        },
                        {
                            id: 'product-error',
                            title: 'Sản phẩm vi phạm',
                            type: 'item',
                            url: '/error-products',
                            active: true,
                        },
                    ],
                },
                {
                    id: 'marketing-channel-group',
                    title: 'Kênh marketing',
                    type: 'collapse',
                    url: '',
                    icon: faUserGroup,
                    children: [
                        {
                            id: 'marketing-channel',
                            title: 'Kênh marketing',
                            type: 'item',
                            url: '/marketing-channel',
                            active: true,
                        },
                        {
                            id: 'discount-code',
                            title: 'Mã giảm giá',
                            type: 'item',
                            url: '/my-program',
                            active: true,
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
