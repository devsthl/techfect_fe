import React from 'react';
import classNames from 'classnames/bind';
import styles from './SideBarUser.module.scss';
import { NavLink, useNavigate } from 'react-router-dom';
import sideBarItemUser from '~/utils/sideBarItemUser';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import sideBarItemUserEng from '~/utils/sideBarItemUserEng';
import { message } from 'antd';

const cx = classNames.bind(styles);

const sidebarItemUserClassName = cx('sidebar-item-children');
const sidebarItemUserClassNameActive = cx('sidebar-item-children', 'active');

const language = localStorage.getItem('i18nextLng');

const SideBarUser = () => {
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
                    ? sideBarItemUser?.items[0]?.children.map((x) => {
                          let sub;
                          if (x.children) {
                              sub = x.children.map((y) => {
                                  return (
                                      <NavLink
                                          key={y.id}
                                          className={({ isActive }) =>
                                              isActive ? sidebarItemUserClassNameActive : sidebarItemUserClassName
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
                                      <FontAwesomeIcon key={x.id} className={cx('title-icon')} icon={x.icon} />
                                      <span className={cx('sidebar-item')}>{x.title}</span>
                                  </div>
                                  {sub}
                              </div>
                          );
                      })
                    : sideBarItemUserEng?.items[0]?.children.map((x) => {
                          let sub;
                          if (x.children) {
                              sub = x.children.map((y) => {
                                  return (
                                      <NavLink
                                          key={y.id}
                                          className={({ isActive }) =>
                                              isActive ? sidebarItemUserClassNameActive : sidebarItemUserClassName
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
                                      <FontAwesomeIcon key={x.id} className={cx('title-icon')} icon={x.icon} />
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

export default SideBarUser;
