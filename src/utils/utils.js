export const isAdmin = () => {
    const user = localStorage.getItem('user') !== null ? JSON.parse(localStorage.getItem('user')) : null;
    const userRole = user == null ? null : user.type;
    return userRole === 1;
};
export const isSubAdmin = () => {
    const user = localStorage.getItem('user') !== null ? JSON.parse(localStorage.getItem('user')) : null;
    const userRole = user == null ? null : user.type;
    return userRole === 3;
};
export const isEnterprise = () => {
    const user = localStorage.getItem('user') !== null ? JSON.parse(localStorage.getItem('user')) : null;
    const userRole = user == null ? null : user.type;
    return userRole === 5;
};
export const isCustomer = () => {
    const user = localStorage.getItem('user') !== null ? JSON.parse(localStorage.getItem('user')) : null;
    const userRole = user == null ? null : user.type;
    return userRole === 2;
};
export const checkAddOrEditForm = (params) => {
    return Object.keys(params).includes('id');
};
