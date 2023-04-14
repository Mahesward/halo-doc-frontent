import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyBrxPv4FG5LCL0_YbkiN9yLlCPD2BPHj1o',
  authDomain: 'halo-doc-3a9de.firebaseapp.com',
  projectId: 'halo-doc-3a9de',
  storageBucket: 'halo-doc-3a9de.appspot.com',
  messagingSenderId: '131551734018',
  appId: '1:131551734018:web:8158b439926adc7ea7fa1b',
  measurementId: 'G-6WJKNNN1VZ',
};

// Initialize Firebase
export const appConfig = initializeApp(firebaseConfig);
export const authConfig = getAuth(appConfig);
