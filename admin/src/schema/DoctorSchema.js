import * as yup from 'yup';

const mobileRegExp = /^\d{10}$/;
const emailRegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

const doctorSchema = yup.object().shape({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  email: yup.string().matches(emailRegExp, 'Invalid email address').required('Email is required'),
  phone: yup.string().matches(mobileRegExp, 'Invalid mobile number').required('Mobile number is required'),
  department: yup.string().required('Department is required'),
  dob: yup.string().required('DOB is required'),
  fees: yup.number().required('Fees is required'),
  workTime: yup.string().required('Work Time is required'),
  address: yup.string().required('Address is required'),
  profile: yup.string().required('Bio is required'),
  password: yup.string().required('password is required'),
  confirmPassword: yup.string().required('password is required'),
});

export default doctorSchema;
