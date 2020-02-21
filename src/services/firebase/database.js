import * as firebase from 'firebase/app';
import 'firebase/firestore';
import { db } from './';

function getItems() {
  const items = new Promise(resolve => {
    db
      .collection('items')
      .get()
      .then(function(querySnapshot) {
        const itemData = [];
        querySnapshot.forEach(function(doc) {
          itemData.push({
            ...doc.data(),
            id: doc.id,
          });
        });
        resolve(itemData);
      });
  });
  return items;
}

function getScrollIndex() {
  const scrollIndex = new Promise(resolve => {
    db
      .collection('scrollIndex')
      .get()
      .then(function(querySnapshot) {
        const scrollIndex = [];
        querySnapshot.forEach(function(doc) {
          scrollIndex.push({
            ...doc.data(),
          });
        });
        resolve(scrollIndex[0].scrollIndex);
      });
  });
  return scrollIndex;
}

function voteUp(documentId) {
  const documentRef = db.collection('items').doc(documentId);
  documentRef.update({
    voteCount: firebase.firestore.FieldValue.increment(1),
  });
}

function voteDown(documentId) {
  const documentRef = db.collection('items').doc(documentId);
  documentRef.update({
    voteCount: firebase.firestore.FieldValue.increment(-1),
  });
}

export const databaseActions = {
  getItems,
  getScrollIndex,
  voteUp,
  voteDown,
};
