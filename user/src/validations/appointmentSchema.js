import * as yup from 'yup';

const mobileRegExp = /^\d{10}$/;
const emailRegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

const appointmentSchema = yup.object().shape({
  age: yup.number().required('Age Is Required'),
  gender: yup.string().required('Select a gender'),
  name: yup.string().required('Name is required'),
  email: yup.string().matches(emailRegExp, 'Invalid email address').required('Email is required'),
  mobile: yup.string().matches(mobileRegExp, 'Invalid mobile number').required('Mobile number is required'),
  department: yup.string().required('Department is required'),
  visitedBefore: yup.boolean().required('required'),
  date: yup.string().required('Select a date'),
  time: yup.string().required('Select a time'),
});

export default appointmentSchema;
