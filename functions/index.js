const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

exports.onMessageCreate = functions.firestore
  .document("messages/{userId}")
  .onCreate((snap, context) => {
    const ref = admin
      .firestore()
      .collection("messages")
      .orderBy("timestamp");

    ref.onSnapshot(snapshot => {
      i = 0;
      size = snapshot.size;
      sizeToDelete = size - 50;
      console.log("Messages Count: " + size);

      snapshot.forEach(doc => {
        if (i < sizeToDelete) {
          doc.ref
            .delete()
            .then(() => {
              console.log("Document deleted successfully");
              return true;
            })
            .catch(err => {
              console.log("Error removing document: " + err);
            });
        }
        i++;
      });
    });
  });

  exports.onSportCreate = functions.firestore
  .document("sports/{userId}")
  .onCreate((snap, context) => {
    const ref = admin
      .firestore()
      .collection("sports")
      .orderBy("timestamp");

    ref.onSnapshot(snapshot => {
      i = 0;
      size = snapshot.size;
      sizeToDelete = size - 50;
      console.log("Messages Count: " + size);

      snapshot.forEach(doc => {
        if (i < sizeToDelete) {
          doc.ref
            .delete()
            .then(() => {
              console.log("Document deleted successfully");
              return true;
            })
            .catch(err => {
              console.log("Error removing document: " + err);
            });
        }
        i++;
      });
    });
  });

  exports.onNewsCreate = functions.firestore
  .document("news/{userId}")
  .onCreate((snap, context) => {
    const ref = admin
      .firestore()
      .collection("news")
      .orderBy("timestamp");

    ref.onSnapshot(snapshot => {
      i = 0;
      size = snapshot.size;
      sizeToDelete = size - 50;
      console.log("Messages Count: " + size);

      snapshot.forEach(doc => {
        if (i < sizeToDelete) {
          doc.ref
            .delete()
            .then(() => {
              console.log("Document deleted successfully");
              return true;
            })
            .catch(err => {
              console.log("Error removing document: " + err);
            });
        }
        i++;
      });
    });
  });
