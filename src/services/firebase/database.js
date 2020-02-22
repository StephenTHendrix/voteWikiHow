import * as firebase from "firebase/app";
import "firebase/firestore";
import { db } from "./";

function getItems() {
  const items = new Promise(resolve => {
    db.collection("items")
      .get()
      .then(function(querySnapshot) {
        const itemData = [];
        querySnapshot.forEach(function(doc) {
          itemData.push({
            ...doc.data(),
            id: doc.id
          });
        });
        resolve(itemData);
      });
  });

  return items;
}

function voteUp(documentId) {
  const documentRef = db.collection("items").doc(documentId);
  documentRef.update({
    voteCount: firebase.firestore.FieldValue.increment(1)
  });
}

function voteDown(documentId) {
  const documentRef = db.collection("items").doc(documentId);
  documentRef.update({
    voteCount: firebase.firestore.FieldValue.increment(-1)
  });
}

export const databaseActions = {
  getItems,
  voteUp,
  voteDown
};

// function getScrollIndex() {
//   const scrollIndex = new Promise(resolve => {
//     var documentRef = db.collection("scrollIndex").doc("scrollIndex");

//     documentRef
//       .get()
//       .then(function(doc) {
//         if (doc.exists) {
//           resolve(doc.data().scrollIndex);
//         } else {
//           // doc.data() will be undefined in this case
//           console.log("No such document!");
//         }
//       })
//       .catch(function(error) {
//         console.log("Error getting document:", error);
//       });
//   });

//   return scrollIndex;
// }

// function scrollUp() {
//   var documentRef = db.collection("scrollIndex").doc("scrollIndex");
//   documentRef.update({
//     scrollIndex: firebase.firestore.FieldValue.increment(1)
//   });
//   getScrollIndex();
// }

// function scrollDown() {
//   var documentRef = db.collection("scrollIndex").doc("scrollIndex");
//   documentRef.update({
//     scrollIndex: firebase.firestore.FieldValue.increment(-1)
//   });
//   getScrollIndex();
// }
