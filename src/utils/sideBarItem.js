import { faBuilding, faUser, faUserGroup, faReceipt, faBook } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    items: [
        {
            id: 'home',
            type: 'group',
            icon: '',
            children: [
                // {
                //     id: 'personalinfo',
                //     title: 'Thông tin cá nhân',
                //     type: 'item',
                //     url: '',
                //     icon: faUser,
                // },
                {
                    id: 'businessmanage',
                    title: 'Quản lý doanh nghiệp',
                    type: 'collapse',
                    url: '',
                    icon: faBuilding,
                    children: [
                        {
                            id: 'createbusiness',
                            title: 'Tạo doanh nghiệp mới',
                            type: 'item',
                            url: '/businessmanage/createbusiness',
                        },
                        {
                            id: 'listbusiness',
                            title: 'Danh sách doanh nghiệp',
                            type: 'item',
                            url: '/businessmanage/listbusiness',
                        },
                    ],
                },
                {
                    id: 'groupmanage',
                    title: 'Quản lý hội nhóm',
                    type: 'collapse',
                    url: '',
                    icon: faUserGroup,
                    children: [
                        {
                            id: 'creategroup',
                            title: 'Tạo hội nhóm mới',
                            type: 'item',
                            url: '/groupmanage/creategroup',
                        },
                        {
                            id: 'listgroups',
                            title: 'Danh sách hội nhóm',
                            type: 'item',
                            url: '/groupmanage/listgroups',
                        },
                    ],
                },
                {
                    id: 'groupmanage',
                    title: 'Quản lý tư vấn',
                    type: 'collapse',
                    url: '',
                    icon: faUserGroup,
                    children: [
                        {
                            id: 'creategroup',
                            title: 'Tạo nhà tư vấn mới',
                            type: 'item',
                            url: '/consultant/create-consultant',
                        },
                        {
                            id: 'listgroups',
                            title: 'Danh sách nhà tư vấn',
                            type: 'item',
                            url: '/consultant/list-consultant',
                        },
                    ],
                },
                {
                    id: 'postsmanage',
                    title: 'Quản lý tin tức',
                    type: 'collapse',
                    url: '',
                    icon: faReceipt,
                    children: [
                        {
                            id: 'createpost',
                            title: 'Thêm tin tức',
                            type: 'item',
                            url: '/postsmanage/createpost',
                        },
                        {
                            id: 'listposts',
                            title: 'Danh sách tin tức',
                            type: 'item',
                            url: '/postsmanage/listposts',
                        },
                    ],
                },
                {
                    id: 'coursesmanage',
                    title: 'Quản lý khóa học',
                    type: 'collapse',
                    url: '',
                    icon: faBook,
                    children: [
                        {
                            id: 'createcourse',
                            title: 'Thêm khóa học',
                            type: 'item',
                            url: '/coursesmanage/createcourse',
                        },
                        {
                            id: 'listcourses',
                            title: 'Danh sách khóa học',
                            type: 'item',
                            url: '/coursesmanage/listcourses',
                        },
                    ],
                },
                {
                    id: 'fieldmanage',
                    title: 'Quản lý lĩnh vực',
                    type: 'collapse',
                    url: '',
                    icon: faBook,
                    children: [
                        {
                            id: 'createfield',
                            title: 'Thêm lĩnh vực',
                            type: 'item',
                            url: '/fieldmanage/create-field',
                        },
                        {
                            id: 'list-fields',
                            title: 'Danh sách lĩnh vực',
                            type: 'item',
                            url: '/list-fields',
                        },
                    ],
                },
                // {
                //     id: 'news-manage',
                //     title: 'Quản lý tin tức',
                //     type: 'collapse',
                //     url: '',
                //     icon: faBook,
                //     children: [
                //         {
                //             id: 'create-news',
                //             title: 'Thêm tin tức',
                //             type: 'item',
                //             url: '/create-news',
                //         },
                //         {
                //             id: 'list-news',
                //             title: 'Danh sách tin tức',
                //             type: 'item',
                //             url: '/list-news',
                //         },
                //     ],
                // },
                {
                    id: 'events-manage',
                    title: 'Quản lý sự kiện',
                    type: 'collapse',
                    url: '',
                    icon: faBook,
                    children: [
                        {
                            id: 'create-events',
                            title: 'Thêm sự kiện',
                            type: 'item',
                            url: '/create-events',
                        },
                        {
                            id: 'list-events',
                            title: 'Danh sách sự kiện',
                            type: 'item',
                            url: '/list-events',
                        },
                    ],
                },
                {
                    id: 'documents-manage',
                    title: 'Quản lý tài liệu',
                    type: 'collapse',
                    url: '',
                    icon: faBook,
                    children: [
                        {
                            id: 'create-documents',
                            title: 'Thêm tài liệu',
                            type: 'item',
                            url: '/create-documents',
                        },
                        {
                            id: 'list-documents',
                            title: 'Danh sách tài liệu',
                            type: 'item',
                            url: '/list-documents',
                        },
                    ],
                },
                {
                    id: 'package-manage',
                    title: 'Quản lý gói',
                    type: 'collapse',
                    url: '',
                    icon: faBook,
                    children: [
                        // {
                        //     id: 'create-package',
                        //     title: 'Thêm sự kiện',
                        //     type: 'item',
                        //     url: '/create-events',
                        // },
                        {
                            id: 'manage-package',
                            title: 'Quản lý gói đăng ký',
                            type: 'item',
                            url: '/manage-package',
                        },
                        // {
                        //     id: 'create-package',
                        //     title: 'Tạo gói mới',
                        //     type: 'item',
                        //     url: '/create-package',
                        // },
                    ],
                },
            ],
        },
    ],
};
