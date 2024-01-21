import * as yup from 'yup';

const websiteRegExp = /^((https?|ftp):\/\/)?(www.)?([a-zA-Z0-9])+[\.]([a-zA-Z0-9]{2,4})(\/[a-zA-Z0-9#-]+\/?)*$/;

export const validationSchema = yup.object().shape({
    name: yup.string()
        .required('Username is required'),
    email: yup.string()
        .email('Invalid email')
        .required('Email is required'),
    phone: yup.string()
        .required('Phone number is required'),
    website: yup.string()
        .required('Website is required')
        .matches(websiteRegExp, 'Website is not valid'),
    address: yup.object()
        .shape({
            street: yup.string().required('Street is required'),
            suite: yup.string().required('Suite is required'),
            city: yup.string().required('City is required'),
        }),
    company: yup.object()
        .shape({
            name: yup.string().required('Company name is required'),
        })
});
