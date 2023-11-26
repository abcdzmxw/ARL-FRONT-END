import { validatenull } from './validate'

export const filterForm = (form) => {
    let obj = {};
    Object.keys(form).forEach(ele => {
        if (!validatenull(form[ele])) {
            obj[ele] = form[ele]
        }
    });
    return obj;
}

export const vaildData = (val, dafult) => {
    if (typeof val === 'boolean') {
        return val;
    }
    return !validatenull(val) ? val : dafult;
};