import React from 'react';
import classNames from 'classnames/bind';
import { NavLink } from 'react-router-dom';
import styles from './SideBarBusinessAdmin.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import sideBarItemBusinessAdmin from '~/utils/sideBarItemBusinessAdmin';
import sideBarItemBusinessAdminEng from '~/utils/sideBarItemBusinessAdminEng';
import { useEffect } from 'react';
import { useState } from 'react';
import { message } from 'antd';
import { t } from 'i18next';

const cx = classNames.bind(styles);
const sidebarItemAdminBusiness = cx('sidebar-item-children');
const sidebarItemAdminBusinessActive = cx('sidebar-item-children', 'active');

const SideBarBusinessAdmin = () => {
    let newDate = new Date();

    const language = localStorage.getItem('i18nextLng');
    const packageDetail = localStorage.getItem('package') === null ? null : JSON.parse(localStorage.getItem('package'));
    const [dataSidebar, setDataSidebar] = useState();
    console.log('language', language);

    useEffect(() => {
        console.log('viiiiiiiii');
        if (language === 'vi') {
            const tpDataVI = {
                items: sideBarItemBusinessAdmin.items.map((parItem) => {
                    return {
                        ...parItem,
                        children:
                            packageDetail?.cooperation_package_id !== 3 &&
                            packageDetail?.cooperation_package_id !== 4 &&
                            packageDetail?.cooperation_package_id !== 5
                                ? parItem.children.map((chilItem) => {
                                      if (chilItem.id === 'courses-manage' || chilItem.id === 'product-manage') {
                                          return {
                                              ...chilItem,
                                              children: chilItem?.children.map((subChilItem) => {
                                                  return {
                                                      ...subChilItem,
                                                      active: false,
                                                  };
                                              }),
                                          };
                                      } else {
                                          return {
                                              ...chilItem,
                                          };
                                      }
                                  })
                                : parItem.children.map((childItem) => {
                                      if (newDate > packageDetail.end_date) {
                                          parItem.children.map((chilItem) => {
                                              if (
                                                  chilItem.id === 'courses-manage' ||
                                                  chilItem.id === 'product-manage'
                                              ) {
                                                  return {
                                                      ...chilItem,
                                                      children: chilItem?.children.map((subChilItem) => {
                                                          return {
                                                              ...subChilItem,
                                                              active: false,
                                                          };
                                                      }),
                                                  };
                                              } else {
                                                  return {
                                                      ...chilItem,
                                                  };
                                              }
                                          });
                                      } else
                                          return {
                                              ...childItem,
                                          };
                                  }),
                    };
                }),
            };
            setDataSidebar(tpDataVI);
        }
        if (language === 'en') {
            console.log('ennnnnnnnnn');
            const tpDataEN = {
                items: sideBarItemBusinessAdminEng.items.map((parItem) => {
                    return {
                        ...parItem,
                        children:
                            packageDetail?.cooperation_package_id !== 3 &&
                            packageDetail?.cooperation_package_id !== 4 &&
                            packageDetail?.cooperation_package_id !== 5
                                ? parItem.children.map((chilItem) => {
                                      if (chilItem.id === 'courses-manage' || chilItem.id === 'product-manage') {
                                          return {
                                              ...chilItem,
                                              children: chilItem?.children.map((subChilItem) => {
                                                  return {
                                                      ...subChilItem,
                                                      active: false,
                                                  };
                                              }),
                                          };
                                      } else {
                                          return {
                                              ...chilItem,
                                          };
                                      }
                                  })
                                : parItem.children.map((childItem) => {
                                      if (newDate > packageDetail.end_date) {
                                          parItem.children.map((chilItem) => {
                                              if (
                                                  chilItem.id === 'courses-manage' ||
                                                  chilItem.id === 'product-manage'
                                              ) {
                                                  return {
                                                      ...chilItem,
                                                      children: chilItem?.children.map((subChilItem) => {
                                                          return {
                                                              ...subChilItem,
                                                              active: false,
                                                          };
                                                      }),
                                                  };
                                              } else {
                                                  return {
                                                      ...chilItem,
                                                  };
                                              }
                                          });
                                      } else
                                          return {
                                              ...childItem,
                                          };
                                  }),
                    };
                }),
            };
            setDataSidebar(tpDataEN);
        }
    }, []);

    return (
        <aside className={cx('sidebar')}>
            <ul className={cx('sidebar-list')}>
                {/* {language === 'vi'
                    ?  */}
                {dataSidebar?.items[0]?.children.map((x) => {
                    let sub;
                    if (x.children) {
                        sub = x.children.map((y) => {
                            return (
                                <NavLink
                                    onClick={() => {
                                        if (!y.active) {
                                            message.warning('Bạn phải đăng ký gói để sử dụng chức năng này');
                                        }
                                    }}
                                    key={y.id}
                                    className={({ isActive }) =>
                                        isActive ? sidebarItemAdminBusinessActive : sidebarItemAdminBusiness
                                    }
                                    to={y.active ? y.url : '/activities?key=cooperate'}
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
                {/* : dataSidebar?.items[0]?.children.map((x) => {
                          let sub;
                          if (x.children) {
                              sub = x.children.map((y) => {
                                  return (
                                      <NavLink
                                          key={y.id}
                                          className={({ isActive }) =>
                                              isActive ? sidebarItemAdminBusinessActive : sidebarItemAdminBusiness
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
                      })} */}
            </ul>
            <a className={cx('logout')}>
                <FontAwesomeIcon icon={faRightFromBracket} />
                <span>{t('text.sign_out')}</span>
            </a>
        </aside>
    );
};

export default SideBarBusinessAdmin;
