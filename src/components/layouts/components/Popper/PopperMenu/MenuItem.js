import ButtonComponent from "../../Button";
import classNames from "classnames/bind";
import styles from "./PopperMenu.module.scss"

const cx = classNames.bind(styles)

function MenuItem({ data }) {
    return <ButtonComponent className={cx('menu-item')} leftIcon={data.icon}>{data.title}</ButtonComponent>
}

export default MenuItem;