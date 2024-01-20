import * as yup from 'yup';

const phoneRegExp = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/

export const validationSchema = yup.object().shape({
    name: yup.string()
        .required('Username is required'),
    email: yup.string()
        .email('Invalid email')
        .required('Email is required'),
    phone: yup.string()
        .matches(phoneRegExp, 'Phone number is not valid')
        .required('Phone number is required'),
    website: yup.string(),
    address: yup.object()
        .shape({
            street: yup.string().required('Street is required'),
            suite: yup.string().required('Suite is required'),
            city: yup.string().required('City is required'),
        })
});
