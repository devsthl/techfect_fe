import React, { useState } from 'react';
import Advise from './Advise';
import Cooperate from './Cooperate';
import Courses from './Courses';
import Participate from './Participate';
import './Activities.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faChartSimple, faMedal, faPeopleGroup } from '@fortawesome/free-solid-svg-icons';
import { useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const Activities = () => {
    const [layoutActivity, setLayoutActivity] = useState();
    const [colorClick, setColorClick] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();
    const { t } = useTranslation();

    let classes = `activities-item ${colorClick}`;

    useEffect(() => {
        if (searchParams.get('key') === null) {
            setLayoutActivity(<Advise />);
            setColorClick('advise');
        }
        if (searchParams.get('key') === 'advise') {
            setColorClick('advise');
            setLayoutActivity(<Advise />);
        }
        if (searchParams.get('key') === 'cooperate') {
            setColorClick('cooperate');
            setLayoutActivity(<Cooperate />);
        }
        if (searchParams.get('key') === 'participate') {
            setColorClick('participate');
            setLayoutActivity(<Participate />);
        }
        if (searchParams.get('key') === 'courses') {
            setColorClick('courses');
            setLayoutActivity(<Courses />);
        }
    }, [searchParams]);

    const activitiesItem = [
        {
            id: '1',
            title: t('text.Consultants'),
            name: 'advise',
            icon: <FontAwesomeIcon icon={faUser} />,
            path: '/activities/advise',
            component: Advise,
        },
        {
            id: '2',
            title: t('text.Partner_with_ConnectUp'),
            name: 'cooperate',
            icon: <FontAwesomeIcon icon={faChartSimple} />,
            path: '/activities/cooperate',
            component: Cooperate,
        },
        {
            id: '3',
            title: t('text.Join_competition'),
            name: 'participate',
            icon: <FontAwesomeIcon icon={faMedal} />,
            path: '/activities/participate',
            component: Participate,
        },
        {
            id: '4',
            title: t('text.Training_Course'),
            icon: <FontAwesomeIcon icon={faPeopleGroup} />,
            name: 'courses',
            path: '/activities/courses',
            component: Courses,
        },
    ];

    return (
        <div className="wrapper" id="activities">
            <div className="inner">
                <div className="top-main">
                    <ul className="list-activities">
                        {activitiesItem.map((item) => {
                            const ActivityLayout = item.component;
                            return (
                                <li
                                    className={item.name === colorClick ? classes : 'activities-item'}
                                    onClick={() => {
                                        setSearchParams(`key=${item.name}`);
                                    }}
                                >
                                    {item.icon}
                                    {item.title}
                                </li>
                            );
                        })}
                    </ul>
                </div>
                <div className="content-main">{layoutActivity}</div>
            </div>
        </div>
    );
};

export default Activities;
