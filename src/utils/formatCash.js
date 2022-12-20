function formatCash(str) {
    if (str === undefined) {
        return '';
    } else
        return str
            .split('')
            .reverse()
            .reduce((prev, next, index) => {
                return (index % 3 ? next : next + ',') + prev;
            });
}

export default formatCash;
