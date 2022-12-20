import classNames from "classnames/bind";
import styles from './Dcuments.module.scss'
import { getAllDocuments } from "~/store/Documents/documentsSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ListDocument from "./ListDocument";

const cx = classNames.bind(styles)
function Documents() {
    const dispatch = useDispatch();
    const { documentsList } = useSelector((state) => state.documentsReducer)
    useEffect(() => {
        dispatch(getAllDocuments());
    }, [dispatch])
    const list = documentsList?.map((item, index) => {
        return (
            <ListDocument item={item} />
        )
    })
    return (
        <div className={cx('wrapper')}>
            <span>Danh sách tài liệu</span>
            {list}
        </div>
    );
}

export default Documents;