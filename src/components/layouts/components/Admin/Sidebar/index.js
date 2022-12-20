import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import sideBarRoutes from '~/utils/sideBarItem';
import classNames from 'classnames/bind';
import styles from './SideBarAdmin.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import sideBarItemEng from '~/utils/sideBarItemEng';
import { message } from 'antd';

const cx = classNames.bind(styles);

const sidebarItemClassName = cx('sidebar-item-children');
const sidebarItemClassNameActive = cx('sidebar-item-children', 'active');

const language = localStorage.getItem('i18nextLng');

const SideBarAdmin = () => {
    const navigate = useNavigate();

    const handlelogout = (e) => {
        localStorage.clear();
        message.success('Bạn đã đăng xuất');
        setTimeout(() => {
            navigate('/');
            window.location.reload();
        }, 1000);
    };

    return (
        <aside className={cx('sidebar')}>
            <ul className={cx('sidebar-list')}>
                {language === 'vi'
                    ? sideBarRoutes?.items[0]?.children.map((x, index) => {
                          let sub;
                          if (x.children) {
                              sub = x.children.map((y) => {
                                  return (
                                      <NavLink
                                          key={y.id}
                                          className={({ isActive }) =>
                                              isActive ? sidebarItemClassNameActive : sidebarItemClassName
                                          }
                                          to={y.url}
                                      >
                                          {y.title}
                                      </NavLink>
                                  );
                              });
                          }
                          return (
                              <div className={cx('group-sidebar')}>
                                  <div className={cx('title-group')}>
                                      <FontAwesomeIcon key={index} className={cx('title-icon')} icon={x.icon} />
                                      <span className={cx('sidebar-item')}>{x.title}</span>
                                  </div>
                                  {sub}
                              </div>
                          );
                      })
                    : sideBarItemEng?.items[0]?.children.map((x, index) => {
                          let sub;
                          if (x.children) {
                              sub = x.children.map((y) => {
                                  return (
                                      <NavLink
                                          key={y.id}
                                          className={({ isActive }) =>
                                              isActive ? sidebarItemClassNameActive : sidebarItemClassName
                                          }
                                          to={y.url}
                                      >
                                          {y.title}
                                      </NavLink>
                                  );
                              });
                          }
                          return (
                              <div className={cx('group-sidebar')}>
                                  <div className={cx('title-group')}>
                                      <FontAwesomeIcon key={index} className={cx('title-icon')} icon={x.icon} />
                                      <span className={cx('sidebar-item')}>{x.title}</span>
                                  </div>
                                  {sub}
                              </div>
                          );
                      })}
            </ul>
            <a className={cx('logout')}>
                <FontAwesomeIcon icon={faRightFromBracket} />
                <span onClick={handlelogout}>Đăng xuất</span>
            </a>
        </aside>
    );
};

export default SideBarAdmin;
