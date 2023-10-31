import data from './firebase_config.json' assert { type:'json' }

const firebaseConfig = {
  apiKey: data.apiKey,
  authDomain: data.authDomain,
  projectId: data.projectId,
  storageBucket: data.storageBucket,
  messagingSenderId: data.messagingSenderId,
  appId: data.appId,
  measurementId: data.measurementId
};

export const fireconfig = data;

import { initializeAuth } from 'firebase/auth';