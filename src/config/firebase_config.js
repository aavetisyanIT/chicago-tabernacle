import { initializeApp } from 'firebase/app';
import devEnvironmentVariables from './env';

const firebaseConfig = {
  apiKey: devEnvironmentVariables.DEV_APIKEY,
  authDomain: devEnvironmentVariables.DEV_AUTHDOMAIN,
  projectId: devEnvironmentVariables.DEV_PROJECTID,
  storageBucket: devEnvironmentVariables.DEV_STORAGEBUCKET,
  messagingSenderId: devEnvironmentVariables.DEV_MESAGINGSENDERID,
  appId: devEnvironmentVariables.DEV_APPID,
  measurementId: devEnvironmentVariables.DEV_MEASUREMENTID,
};

const firebase = initializeApp(firebaseConfig);

export default firebase;
