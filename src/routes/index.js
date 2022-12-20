//Layout

import { DefaultHeaderLayout, DefaultHeaderLayout2, DefaultHeaderLogin } from '~/components/layouts';

//Pages
import Login from '~/pages/LandingPage/login';
import Introduce from '~/pages/LandingPage/introduce';
import News from '~/pages/LandingPage/news';

// routes Admin

import AdminLogin from '~/layouts/AdminLayout/AdminLogin';
import Dashboard from '~/layouts/AdminLayout/Dashboard';
import CreateBusiness from '~/layouts/AdminLayout/BusinessManage/CreateBusiness';
import ListBusiness from '~/layouts/AdminLayout/BusinessManage/ListBusiness';
import CreateCourse from '~/layouts/AdminLayout/CoursesManage/CreateCourse';
import ListCourses from '~/layouts/AdminLayout/CoursesManage/ListCourses';
import CreateGroup from '~/layouts/AdminLayout/GroupManage/CreateGroup';
import ListGroup from '~/layouts/AdminLayout/GroupManage/ListGroup';
import CreatePost from '~/layouts/AdminLayout/PostsManage/CreatePost';
import ListPosts from '~/layouts/AdminLayout/PostsManage/ListPosts';
import CourseDetails from '~/layouts/AdminLayout/CoursesManage/CourseDetails';
import BusinessDetails from '~/layouts/AdminLayout/BusinessManage/BusinessDetails';
import PostDetails from '~/layouts/AdminLayout/PostsManage/PostDetails';
import DashboardBusinessAdmin from '~/layouts/BusinessAdminLayout/ProductsManage/Dashboard';
import AllOrder from '~/layouts/BusinessAdminLayout/ProductsManage/AllOrders';
import TransportManage from '~/layouts/BusinessAdminLayout/ProductsManage/TransportManage';
import Financial from '~/layouts/BusinessAdminLayout/ProductsManage/Financial';
import Data from '~/layouts/BusinessAdminLayout/ProductsManage/Data';
import CreateCourseBusiness from '~/layouts/BusinessAdminLayout/CoursesManage/CreateCourse';
import ListCourseBusiness from '~/layouts/BusinessAdminLayout/CoursesManage/ListCourse';
import AllProducts from '~/layouts/BusinessAdminLayout/ProductsManage/AllProducts';
import PersonalInfo from '~/layouts/UserLayout/Account/PersonalInfo';
import UserPassword from '~/layouts/UserLayout/Account/Password';
import UserAddress from '~/layouts/UserLayout/Account/Address';
import OrderManage from '~/layouts/UserLayout/Order/OrderManage';
import FavoriteProduct from '~/layouts/UserLayout/Order/FavoriteProduct';
import PurchasedProduct from '~/layouts/UserLayout/Order/PurchasedProduct';
import FavoriteCourse from '~/layouts/UserLayout/Order/FavoriteCourse';
import ParticipationCourse from '~/layouts/UserLayout/Order/ParticipationCourse';
import ViewStore from '~/pages/LandingPage/Stores/ViewStore';
import ForgotPassWord from '~/pages/LandingPage/login/ForgotPassword';
import CheckOtp from '~/pages/LandingPage/login/CheckOtp';
import ChangePassWord from '~/pages/LandingPage/login/ChangePassword';
import React from 'react';
import DetailStore from '~/pages/LandingPage/Stores/DetailStore';

// const H = React.lazy(() => import('/'));
import CreateProduct from '~/layouts/BusinessAdminLayout/ProductsManage/CreateProduct';
import MarketingChannel from '~/layouts/BusinessAdminLayout/ProductsManage/MarketingChannel';
import OrderDetails from '~/layouts/BusinessAdminLayout/ProductsManage/OrderDetails';
import Payment from '~/layouts/UserLayout/Order/Payment';
import Activities from '~/pages/LandingPage/Activities';
import MyCart from '~/pages/LandingPage/Cart/MyCart';
import PaymentCart from '~/pages/LandingPage/Cart/PaymentCart';
// import CreateField from '~/layouts/AdminLayout/FieldManage/CreateField';
import CreateField from '~/layouts/AdminLayout/FieldManage/CreateField';
// import Events from '~/pages/LandingPage/Events';
import Events from '~/pages/LandingPage/Events';
import Document from '~/pages/LandingPage/Document';
import ListField from '~/layouts/AdminLayout/FieldManage/ListFields';
import CreateEvents from '~/layouts/AdminLayout/EventsManage/CreateEvents';
import ListEvents from '~/layouts/AdminLayout/EventsManage/ListEvents';
import DetailTransport from '~/layouts/BusinessAdminLayout/ProductsManage/TransportManage/DetailTransport';
import MyProgram from '~/layouts/BusinessAdminLayout/ProductsManage/MarketingChannel/ MyProgram';
import CourseRegister from '~/pages/LandingPage/Activities/Courses/CourseRegister';
import NewsDetails from '~/pages/LandingPage/news/NewsDetails';
import RegisterBusiness from '~/layouts/UserLayout/RegisterBusiness';
import ListSubcribers from '~/layouts/AdminLayout/CoursesManage/ListSubcribers';
import DefaultLayout3 from '~/components/layouts/DefaultLayout3';
import ListUser from '~/layouts/AdminLayout/EventsManage/ListUser';

import EditProduct from '~/layouts/BusinessAdminLayout/ProductsManage/EditProduct';
import EditPost from '~/layouts/AdminLayout/PostsManage/EditPost';
import EditCourse from '~/layouts/AdminLayout/CoursesManage/EditCourse';
import RegisterBuy from '~/pages/LandingPage/Activities/Cooperate/RegisterBuy';
import CreateConsultant from '~/layouts/AdminLayout/Consultant/CreateConsultant';
import ListConsultant from '~/layouts/AdminLayout/Consultant/ListConsultant';
import UpdateEvents from '~/layouts/AdminLayout/EventsManage/UpdateEvents';
import UpdateConsultant from '~/layouts/AdminLayout/Consultant/UpdateConsultant';
// import DetailsBusiness from '~/pages/LandingPage/Stores/DetailStore/DetailsProduct';
import ConfirmRegister from '~/pages/LandingPage/login/ConfirmRegister';
import { Fragment } from 'react';
import PackageManage from '~/layouts/AdminLayout/PackageManage/PackageManage';
import PackageDetails from '~/layouts/BusinessAdminLayout/PackageManage/PackageDetails';
import CreatePackage from '~/layouts/BusinessAdminLayout/PackageManage/CreatePackage';
import PaymentOnepay from '~/layouts/UserLayout/Order/Payment/PaymentOnepay';
import Documents from '~/layouts/AdminLayout/Documents';
import CreateDocuments from '~/layouts/AdminLayout/Documents/CreateDocuments';
import UpdateDocuments from '~/layouts/AdminLayout/Documents/UpdateDocument';
import Terms from '~/pages/LandingPage/Policy/Terms';
import Privacy from '~/pages/LandingPage/Policy/Privacy';
import Company from '~/pages/LandingPage/company';
import CompanyDetail from '~/pages/LandingPage/CompanyDetail';
const DetailsBusiness = React.lazy(() => import('~/pages/LandingPage/Stores/DetailStore/DetailsProduct'));
const Home = React.lazy(() => import('~/pages/LandingPage/home'));
const Stores = React.lazy(() => import('~/pages/LandingPage/Stores'));

const ROLES = {
    admin: 1,
    customer: 2,
    adminEcommerce: 3,
    subAdminEcommerce: 4,
    adminStore: 5,
    subAdminStore: 6,
};

const publicRoutes = [
    { path: '/', component: Home, layout: DefaultLayout3 },
    { path: '/login', component: Login, layout: DefaultHeaderLogin },
    { path: '/register-confirm', component: ConfirmRegister, layout: Fragment },
    { path: '/login/forgetpassword', component: ForgotPassWord, layout: DefaultHeaderLogin },
    { path: '/login/forgetpassword/checkotp', component: CheckOtp, layout: DefaultHeaderLogin },
    { path: '/verify-newpassword', component: ChangePassWord, layout: DefaultHeaderLogin },
    { path: '/introduce', component: Introduce, layout: DefaultHeaderLayout },
    { path: '/document', component: Document, layout: DefaultHeaderLayout2 },
    { path: '/news', component: News, layout: DefaultHeaderLayout2 },
    { path: '/news/:id', component: NewsDetails, layout: DefaultHeaderLayout2 },

    { path: '/fields-list', component: Stores, layout: DefaultHeaderLayout2 },
    { path: '/stores/viewstore/:id', component: ViewStore, layout: DefaultHeaderLayout2 },
    { path: '/events', component: Events, layout: DefaultHeaderLayout2 },

    { path: '/stores', component: Stores, layout: DefaultHeaderLayout2 },
    { path: '/stores/viewstore', component: ViewStore, layout: DefaultHeaderLayout2 },
    { path: '/stores/viewstore/detail-product/:id', component: DetailStore, layout: DefaultHeaderLayout2 },
    { path: '/activities', component: Activities, layout: DefaultHeaderLayout2 },
    { path: '/activities/cooperate/register', component: RegisterBuy, layout: DefaultHeaderLayout2 },
    { path: '/course-register/:id', component: CourseRegister, layout: DefaultHeaderLayout2 },

    { path: '/my-cart', component: MyCart, layout: DefaultHeaderLayout2 },
    { path: '/payment-cart', component: PaymentCart, layout: DefaultHeaderLayout2 },
    { path: '/store-details', component: DetailsBusiness, layout: DefaultHeaderLayout2 },
    { path: '/onepay/domestic/callback', component: PaymentOnepay, layout: Fragment },
    { path: '/terms', component: Terms, layout: DefaultHeaderLayout2 },
    { path: '/privacy', component: Privacy, layout: DefaultHeaderLayout2 },
    { path: '/company', component: Company, layout: DefaultHeaderLayout2 },
    { path: '/company/:id', component: CompanyDetail, layout: DefaultHeaderLayout2 },
];

//Role 1
const sideBarRoutes = [
    // { path: '/adminlogin', component: AdminLogin, layout: null },
    // { path: '/admindashboard', name: 'Tổng quan', component: Dashboard },

    { path: '/businessmanage/createbusiness', name: 'Tạo doanh nghiệp mới', component: CreateBusiness },
    { path: '/businessmanage/listbusiness', name: 'Danh sách doanh nghiệp', component: ListBusiness },
    { path: '/businessmanage/businessdetails/:id', name: 'Chi tiết doanh nghiệp', component: BusinessDetails },

    { path: '/coursesmanage/createcourse', name: 'Thêm khóa học', component: CreateCourse },
    { path: '/coursesmanage/listcourses', name: 'Danh sách khóa học', component: ListCourses },
    { path: '/coursesmanage/coursedetails/:id', name: 'Chi tiết khóa học', component: CourseDetails },
    { path: '/coursesmanage/edit-course/:id', name: 'Chỉnh sửa khóa học', component: EditCourse },
    { path: '/coursesmanage/list-subcribers/:id', name: 'Danh sách đăng ký', component: ListSubcribers },

    { path: '/groupmanage/creategroup', name: 'Tạo hội nhóm mới', component: CreateGroup },
    { path: '/groupmanage/listgroups', name: 'Danh sách', component: ListGroup },

    { path: '/postsmanage/createpost', name: 'Thêm bài viết', component: CreatePost },
    { path: '/postsmanage/edit-post/:id', name: 'Sửa bài viết', component: EditPost },
    { path: '/postsmanage/listposts', name: 'Danh sách bài viết', component: ListPosts },
    { path: '/postsmanage/postdetails/:id', name: 'Chi tiết bài viết', component: PostDetails },
    { path: '/fieldmanage/create-field', name: 'Thêm gian hàng', component: CreateField },
    { path: '/list-fields', name: 'Danh sách gian hàng', component: ListField },
    { path: '/create-events', name: 'Thêm sự kiện', component: CreateEvents },
    { path: '/list-events/edit-events-id=:id', name: 'Sửa sự kiện', component: UpdateEvents },
    { path: '/list-events', name: 'Danh sách sự kiện', component: ListEvents },
    { path: '/list-events/list-users/:id', name: 'Danh sách user', component: ListUser },
    { path: '/consultant/create-consultant', name: 'Thêm nhà tư vấn', component: CreateConsultant },
    { path: '/consultant/list-consultant', name: 'Danh sách nhà tư vấn', component: ListConsultant },
    { path: '/consultant/edit-consultant-id=:id', name: 'Danh sách nhà tư vấn', component: UpdateConsultant },
    { path: '/manage-package', name: 'Quản lý gói đăng ký', component: PackageManage },
    { path: '/create-package', name: 'Tạo gói mới', component: CreatePackage },
    { path: '/list-documents', name: 'Danh sách tài liệu', component: Documents },
    { path: '/create-documents', name: 'Thêm tài liệu', component: CreateDocuments },
    { path: '/edit-document-id=:id', name: 'Sửa tài liệu', component: UpdateDocuments },
];

//role 5
const privateBusinessAdminRoutes = [
    // { path: '/dashboard', name: 'Tổng quan', component: DashboardBusinessAdmin },
    { path: '/all-orders', name: 'Tất cả đơn hàng', component: AllOrder },
    { path: '/cancel-order', name: 'Tất cả đơn hàng', component: AllOrder },
    { path: '/order-details', name: 'Chi tiết đơn hàng', component: OrderDetails },
    { path: '/all-products', name: 'Tất cả sản phẩm', component: AllProducts },
    { path: '/error-products', name: 'Sản phẩm vi phạm', component: AllProducts },
    { path: `/edit-product/:id`, name: 'Sản phẩm vi phạm', component: EditProduct },
    { path: '/businessadmin/create-order', name: 'Tạo đơn hàng', component: CreateProduct },
    //
    { path: '/transport-manage', name: 'Quản lý vận chuyển', component: TransportManage },
    { path: '/transport-manage/detail', name: 'Quản lý vận chuyển', component: DetailTransport },
    { path: '/financial', name: 'Tài chính', component: Financial },
    { path: '/marketing-channel', name: 'Kênh marketing', component: MarketingChannel },
    { path: '/my-program', name: 'Quảng cáo của tôi', component: MyProgram },
    { path: '/data', name: 'Dữ liệu', component: Data },
    { path: '/businessadmin/createcourse', name: 'Thêm khóa học', component: CreateCourseBusiness },
    { path: '/businessadmin/listcourses', name: 'Danh sách khóa học', component: ListCourseBusiness },
    { path: '/package-details', name: 'Thông tin gói', component: PackageDetails },
];

// role 2
const privateUserRoutes = [
    { path: '/user/personal-info', name: 'Thông tin cá nhân', component: PersonalInfo },
    { path: '/user/password', name: 'Mật khẩu', component: UserPassword },
    { path: '/user/address', name: 'Địa chỉ', component: UserAddress },
    { path: '/user/order-manage', name: 'Quản lý đơn hàng', component: OrderManage },
    { path: '/user/favorite-product', name: 'Sản phẩm yêu thích', component: FavoriteProduct },
    { path: '/user/purchased-product', name: 'Sản phẩm đã mua', component: PurchasedProduct },
    { path: '/user/favorite-course', name: 'Khóa học yêu thích', component: FavoriteCourse },
    { path: '/user/participation-course', name: 'Khóa học đã mua', component: ParticipationCourse },
    { path: '/user/course-payment/:id', name: 'Thanh toán', component: Payment },
    { path: '/user/register-business', name: 'Đăng ký doanh nghiệp', component: RegisterBusiness },
];
export { publicRoutes, sideBarRoutes, privateBusinessAdminRoutes, privateUserRoutes };
