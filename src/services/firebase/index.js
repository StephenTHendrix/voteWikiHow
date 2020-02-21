import * as firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAg1Mv7FNtcaWcirebypKridXeBrqdLkds',
  projectId: 'vote-wikihow',
};

firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();