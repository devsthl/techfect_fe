import moment from 'moment';
import { useTranslation } from 'react-i18next';
const Regex_Email =
    /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const Regex_Phone = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;

export const validateEmail = (email) => {
    if (!email) {
        return 'Vui lòng nhập email';
    }
    if (!Regex_Email.test(email)) {
        return 'Email không hợp lệ';
    }
    return '';
};
export const validatePassword = (password) => {
    if (!password) {
        return 'Vui lòng nhập password';
    }
    if (password.length < 6) {
        return 'Password yêu cầu tối thiểu 6 ký tự';
    }
    return '';
};
export const validateText = (field, text) => {
    if (!text) {
        return `Vui lòng nhập ${field}`;
    }
    return '';
};
export const validateImages = (Image) => {
    if (Image.length === 0 || Image === null) {
        return 'Vui lòng thêm ảnh';
    }
    return '';
};
export const validateTextNumber = (field, number) => {
    if (isNaN(number) === true) {
        return `Vui lòng nhập ${field}`;
    }
    return '';
};
export const validateTime = (from, to) => {
    const s = moment(from).format('yyyy-MM-DD');
    const e = moment(to).format('yyyy-MM-DD');
    if (e < s) {
        return `Ngày kết thúc phải sau ngày bắt đầu`;
    }
    return '';
};
export const validatePhone = (phone) => {
    if (!phone) {
        return 'Vui lòng nhập số điện thoại';
    }
    if (!Regex_Phone.test(phone)) {
        return 'Số điện thoại không hợp lệ';
    }
    return '';
};

export const validate = (type, values, mode) => {
    let value = {};
    switch (type) {
        case 'voucher':
            value = {
                name: validateText('tên voucher', values.name),
                code: validateText('Code', values.code),
                time: validateTime(values.valid_from, values.valid_to),
            };
            break;
        case 'enterprise':
            value = {
                name: validateText('tên đơn vị tư vấn', values.name),
                code: validatePhone(values.phone),
            };
            break;
        case 'customer':
            value = {
                name: validateText('name', values.user_name),
                fullname: validateText('fullname', values.full_name),
                email: validateEmail(values.email),
                phone: validatePhone(values.phone),
                password: mode === 'add' ? validatePassword(values.password) : '',
            };
            break;
        case 'ecommerce':
            value = {
                name: validateText('tên sàn', values.name),
                phone: validatePhone(values.phone),
                email: validateEmail(values.email),
            };
            break;
        case 'store':
            value = {
                name: validateText('tên cửa hàng', values.name),
                phone: validatePhone(values.phone),
                email: validateEmail(values.email),
            };
            break;
        case 'brand':
            value = {
                name: validateText('tên thương hiệu', values.name),
            };
            break;
        case 'product':
            value = {
                name: validateText('tên sản phẩm', values.name),
                price: validateText('giá bán', values.price),
                original_price: validateText('giá nhập', values.original_price),
                quantity: validateText('số lượng', values.quantity),
                //category_id: validateText("danh mục", values.category_id),
                //store_id: validateText("cửa hàng", values.store_id),
                des: validateText('mô tả', values.des),
                image_url: validateImages(values.image_url),
            };
            break;
        case 'user':
            value = {
                name: validateText('tài khoản', values.user_name),
                phone: validatePhone(values.phone),
                email: validateEmail(values.email),
                password: mode === 'add' ? validatePassword(values.password) : '',
            };
            break;
        case 'new':
            value = {
                name: validateText('tên tin tức', values.name),
            };
            break;
        case 'notify':
            value = {
                name: validateText('tên thông báo', values.name),
                content: validateText('nội dung thông báo', values.content),
            };
            break;
        case 'group':
            value = {
                name: validateText('tên hội nhóm', values.name),
                email: validateEmail(values.email),
                phone: validatePhone(values.phone),
            };
            break;
        case 'event':
            value = {
                name: validateText('tên sự kiện', values.name),
                time: validateTime(values.start_time, values.end_time),
            };
            break;
        default:
            break;
    }
    return value;
};

export const isValid = (type, values) => {
    let isValid = false;
    switch (type) {
        case 'voucher':
            isValid = !values.name && !values.code && !values.time;
            break;
        case 'enterprise':
            isValid = !values.name && !values.phone;
            break;
        case 'customer':
            isValid = !values.name && !values.fullname && !values.email && !values.phone && !values.password;
            break;
        case 'ecommerce':
            isValid = !values.name && !values.email && !values.phone;
            break;
        case 'store':
            isValid = !values.name && !values.email && !values.phone;
            break;
        case 'brand':
            isValid = !values.name;
            break;
        case 'product':
            isValid =
                !values.name &&
                !values.price &&
                !values.original_price &&
                !values.quantity &&
                !values.category_id &&
                !values.store_id &&
                !values.des &&
                !values.image_url;
            break;
        case 'user':
            isValid = !values.name && !values.email && !values.phone && !values.password;
            break;
        case 'new':
            isValid = !values.name;
            break;
        case 'notify':
            isValid = !values.name && !values.content;
            break;
        case 'group':
            isValid = !values.name && !values.email && !values.phone;
            break;
        case 'event':
            isValid = !values.name && !values.time;
            break;
        default:
            break;
    }
    return isValid;
};
