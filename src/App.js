import { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DefaultHeaderLayout from '~/components/layouts/DefaultHeaderLayout';
import { publicRoutes, sideBarRoutes, privateBusinessAdminRoutes, privateUserRoutes } from '~/routes';
import AdminLayout from '~/components/layouts/AdminLayouts';
import React, { Suspense } from 'react';
import DefaultBusinessAdminLayout from './components/layouts/DefaultBusinessAdminLayout';
import DefaultUserLayout from './components/layouts/DefaultUserLayout';
import RequireAuth from './routes/RequireAuth';

import { useSelector } from 'react-redux';
import { isAdmin, isCustomer, isEnterprise, isSubAdmin } from './utils/utils';
import Error from './pages/Error';

function App() {
    const { isAuth } = useSelector((state) => state.userReducer);

    const PublicLayout = publicRoutes.map((route, index) => {
        const Page = route.component;
        let Layout = DefaultHeaderLayout;
        if (route.layout) {
            Layout = route.layout;
        } else if (route.layout === null) {
            Layout = Fragment;
        }
        return (
            <Route
                key={index}
                path={route.path}
                element={
                    <Layout>
                        <Page />
                    </Layout>
                }
            />
        );
    });

    const HighestAdminLayout = sideBarRoutes.map((route, index) => {
        const Page = route.component;
        let LayoutAdmin = AdminLayout;
        if (route.layout) {
            LayoutAdmin = route.layout;
        } else if (route.layout === null) {
            LayoutAdmin = Fragment;
        }
        return (
            <Route
                key={index}
                path={route.path}
                element={
                    <LayoutAdmin>
                        <Page />
                    </LayoutAdmin>
                }
            />
        );
    });

    const BusinessAdminLayout = privateBusinessAdminRoutes.map((route, index) => {
        const Page = route.component;
        let LayoutAdmin = DefaultBusinessAdminLayout;
        if (route.layout) {
            LayoutAdmin = route.layout;
        } else if (route.layout === null) {
            LayoutAdmin = Fragment;
        }
        return (
            <Route
                key={index}
                path={route.path}
                element={
                    <LayoutAdmin>
                        <Page />
                    </LayoutAdmin>
                }
            />
        );
    });

    const UserLayout = privateUserRoutes.map((route, index) => {
        const Page = route.component;
        let LayoutAdmin = DefaultUserLayout;
        if (route.layout) {
            LayoutAdmin = route.layout;
        } else if (route.layout === null) {
            LayoutAdmin = Fragment;
        }
        return (
            <Route
                key={index}
                path={route.path}
                element={
                    <LayoutAdmin>
                        <Page />
                    </LayoutAdmin>
                }
            />
        );
    });

    const user = localStorage.getItem('user') === null ? null : JSON.parse(localStorage.getItem('user'));

    const userRole = !user ? null : user.type;
    const checkroles = () => {
        if (isAdmin && user !== null) {
            return HighestAdminLayout;
        }
        if (isEnterprise && user !== null) {
            return BusinessAdminLayout;
        }
        if (isSubAdmin && user !== null) {
            return HighestAdminLayout;
        }
        if (isCustomer && user !== null) {
            return UserLayout;
        }
    };

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Router>
                <div className="App">
                    <Routes element={<RequireAuth />}>
                        {PublicLayout}
                        {user?.type === 5 && user !== null ? (
                            <>
                                {BusinessAdminLayout}
                                {UserLayout}
                            </>
                        ) : (
                            <></>
                        )}
                        {user?.type === 1 && user !== null ? (
                            <>
                                {HighestAdminLayout}
                                {BusinessAdminLayout}
                                {UserLayout}
                            </>
                        ) : (
                            <></>
                        )}
                        {user?.type === 3 && user !== null ? (
                            <>
                                {HighestAdminLayout}
                                {BusinessAdminLayout}
                                {UserLayout}
                            </>
                        ) : (
                            <></>
                        )}
                        {isCustomer && user !== null ? UserLayout : ''}
                        <Route path="*" element={<Error />} />
                    </Routes>
                </div>
            </Router>
        </Suspense>
    );
}

export default App;
