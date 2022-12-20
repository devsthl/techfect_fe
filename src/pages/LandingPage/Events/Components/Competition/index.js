import classNames from 'classnames/bind';
import styles from './Competition.module.scss';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllEventsWithPag } from '~/store/Categories/eventSlice';
import DetailEvent from './DetailEvent';

const cx = classNames.bind(styles);
function Competition() {
    const [currentDetail, setCurrentDetail] = useState(false);
    const [currentId, setCurrentId] = useState();
    const { eventListPag } = useSelector((state) => state.eventsReducer);
    const dispatch = useDispatch();
    const [search, setSearch] = useSearchParams({
        type: 4,
        page_index: 1,
        page_size: 10,
    });
    // const handlePagination = async (page, pageSize) => {
    //     setSearch({ page_index: page, page_size: pageSize });
    // };
    useEffect(() => {
        dispatch(
            getAllEventsWithPag({
                type: search.get('type'),
                index: search.get('page_index'),
                size: search.get('page_size'),
            }),
        );
    }, [dispatch, search]);
    const checkImage = (arrImage) => {
        if (arrImage === null) return null;
        else return process.env.REACT_APP_API_URL + arrImage[0]?.url;
    };
    const handleDetail = (e) => {
        setCurrentDetail(!currentDetail);
        setCurrentId(e);
        console.log('e', eventListPag);
    };
    const list = eventListPag.map((item, index) => {
        return (
            <div>
                {/* {
                    item.type === 3 ?
                        <DetailEvent
                            checkImage={checkImage}
                            handleDetail={handleDetail}
                            item={item}
                            currentId={currentId}
                            index={index}
                            currentDetail={currentDetail}
                        />
                        :
                        <></>
                } */}
                <DetailEvent
                    checkImage={checkImage}
                    handleDetail={handleDetail}
                    item={item}
                    currentId={currentId}
                    index={index}
                    currentDetail={currentDetail}
                />
            </div>
        );
    });
    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>{list}</div>

            {/* <Pagination
                current={parseInt(search.get("page_index"))}
                pageSize={search.get("page_size")}
                // total={storeList.length}
                onChange={handlePagination}
            // showSizeChanger={false}
            /> */}
        </div>
    );
}

export default Competition;
