import * as yup from 'yup';

const mobileRegExp = /^\d{10}$/;
const emailRegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

const appointmentSchema = yup.object().shape({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last Name is required'),
  age: yup.number().required('Age Is Required').min(4, 'Age must be at least 4').max(85, 'Age must be at most 85'),
  gender: yup.string().required('Select a gender'),
  email: yup.string().matches(emailRegExp, 'Invalid email address').required('Email is required'),
  mobile: yup.string().matches(mobileRegExp, 'Invalid mobile number').required('Mobile number is required'),
  department: yup.string().required('Department is required'),
  date: yup.string().required('Select a date'),
  time: yup.string().required('Select a time'),
});

export default appointmentSchema;
