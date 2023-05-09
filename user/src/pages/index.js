import { lazy } from 'react';

const HOME = lazy(() => import('./Home'));
const LOGIN = lazy(() => import('./Login'));
const SIGNUP = lazy(() => import('./Signup'));
const BLOG = lazy(() => import('./Blog'));
const APPOINTMENTS = lazy(() => import('./Appointments'));
const DOCTORS = lazy(() => import('./Doctors'));
const VIEW_APPOINTMENT = lazy(() => import('./View_appointments'));
const PROFILE = lazy(() => import('./Profile'));
const PAYMENT_SUCCESS = lazy(() => import('./PaymentSuccess'));
const CHAT = lazy(() => import('./Chat'));
const VIDEO_CALL = lazy(() => import('./Video_Call'));

export {
  HOME,
  LOGIN,
  SIGNUP,
  BLOG,
  APPOINTMENTS,
  DOCTORS,
  PROFILE,
  VIEW_APPOINTMENT,
  PAYMENT_SUCCESS,
  CHAT,
  VIDEO_CALL,
};
