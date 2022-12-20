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
                    title: 'Manage Company',
                    type: 'collapse',
                    url: '',
                    icon: faBuilding,
                    children: [
                        {
                            id: 'createbusiness',
                            title: 'Add Company',
                            type: 'item',
                            url: '/businessmanage/createbusiness',
                        },
                        {
                            id: 'listbusiness',
                            title: 'Company List',
                            type: 'item',
                            url: '/businessmanage/listbusiness',
                        },
                    ],
                },
                {
                    id: 'groupmanage',
                    title: 'Manage Group',
                    type: 'collapse',
                    url: '',
                    icon: faUserGroup,
                    children: [
                        {
                            id: 'creategroup',
                            title: 'Add Group',
                            type: 'item',
                            url: '/groupmanage/creategroup',
                        },
                        {
                            id: 'listgroups',
                            title: 'Group List',
                            type: 'item',
                            url: '/groupmanage/listgroups',
                        },
                    ],
                },
                {
                    id: 'groupmanage',
                    title: 'Manage Consultant',
                    type: 'collapse',
                    url: '',
                    icon: faUserGroup,
                    children: [
                        {
                            id: 'creategroup',
                            title: 'Add Consultant',
                            type: 'item',
                            url: '/consultant/create-consultant',
                        },
                        {
                            id: 'listgroups',
                            title: 'Consultant List',
                            type: 'item',
                            url: '/consultant/list-consultant',
                        },
                    ],
                },
                {
                    id: 'postsmanage',
                    title: 'Manage News',
                    type: 'collapse',
                    url: '',
                    icon: faReceipt,
                    children: [
                        {
                            id: 'createpost',
                            title: 'Add News',
                            type: 'item',
                            url: '/postsmanage/createpost',
                        },
                        {
                            id: 'listposts',
                            title: 'News List',
                            type: 'item',
                            url: '/postsmanage/listposts',
                        },
                    ],
                },
                {
                    id: 'coursesmanage',
                    title: 'Manage Course',
                    type: 'collapse',
                    url: '',
                    icon: faBook,
                    children: [
                        {
                            id: 'createcourse',
                            title: 'Add Course',
                            type: 'item',
                            url: '/coursesmanage/createcourse',
                        },
                        {
                            id: 'listcourses',
                            title: 'Course List',
                            type: 'item',
                            url: '/coursesmanage/listcourses',
                        },
                    ],
                },
                {
                    id: 'fieldmanage',
                    title: 'Manage Field',
                    type: 'collapse',
                    url: '',
                    icon: faBook,
                    children: [
                        {
                            id: 'createfield',
                            title: 'Add Field',
                            type: 'item',
                            url: '/fieldmanage/create-field',
                        },
                        {
                            id: 'list-fields',
                            title: 'Field List',
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
                    title: 'Manage Event',
                    type: 'collapse',
                    url: '',
                    icon: faBook,
                    children: [
                        {
                            id: 'create-events',
                            title: 'Add Event',
                            type: 'item',
                            url: '/create-events',
                        },
                        {
                            id: 'list-events',
                            title: 'Event List',
                            type: 'item',
                            url: '/list-events',
                        },
                    ],
                },
                {
                    id: 'documents-manage',
                    title: 'Manage Material',
                    type: 'collapse',
                    url: '',
                    icon: faBook,
                    children: [
                        {
                            id: 'create-documents',
                            title: 'Add Material',
                            type: 'item',
                            url: '/create-documents',
                        },
                        {
                            id: 'list-documents',
                            title: 'Material List',
                            type: 'item',
                            url: '/list-documents',
                        },
                    ],
                },
                {
                    id: 'package-manage',
                    title: 'Manage Pack',
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
                            title: 'Manage Registration Pack',
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
                // {
                //     id: 'package-manage',
                //     title: 'Quản lý gói',
                //     type: 'collapse',
                //     url: '',
                //     icon: faBook,
                //     children: [
                //         // {
                //         //     id: 'create-package',
                //         //     title: 'Thêm sự kiện',
                //         //     type: 'item',
                //         //     url: '/create-events',
                //         // },
                //         {
                //             id: 'manage-package',
                //             title: 'Quản lý gói đăng ký',
                //             type: 'item',
                //             url: '/manage-package',
                //         },
                //         {
                //             id: 'create-package',
                //             title: 'Tạo gói mới',
                //             type: 'item',
                //             url: '/create-package',
                //         },
                //     ],
                // },
            ],
        },
    ],
};
