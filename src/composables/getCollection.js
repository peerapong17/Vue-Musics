import { ref, watchEffect } from "vue";
import { projectFirestore } from "../firebase/config";

const getCollection = (collection) => {
  const error = ref(null);
  const document = ref(null);
  const documents = ref(null);
  const isPending = ref(false);
  // register the firestore collection reference
  let docRef = projectFirestore.collection(collection);

  const getDocs = (query) => {
    if (query) {
      docRef = docRef.orderBy("createdAt").where(...query);
    }
    const unsub = docRef.onSnapshot(
      (snapshot) => {
        let results = [];

        snapshot.docs.forEach((doc) => {
          console.log(doc.data())
          // must wait for the server to create the timestamp & send it back
          doc.data().createdAt && results.push({ ...doc.data(), id: doc.id });
        });
        // update values
        documents.value = results;

        error.value = null;

        console.log(results)
      },
      (err) => {
        console.log(err.message);
        documents.value = null;
        error.value = "could not fetch the data";
      }
    );

    watchEffect((onInvalidate) => {
      console.log("unsub");
      onInvalidate(() => unsub());
    });
  };

  const getDoc = (id) => {
    const unsub = docRef.doc(id).onSnapshot(
      (snapshot) => {
        // need to make sure the doc exists & has data
        if (snapshot.data()) {
          document.value = { ...snapshot.data(), id: snapshot.id };
          error.value = null;
        } else {
          error.value = "that document does not exist";
        }
      },
      (err) => {
        console.log(err.message);
        document.value = null;
        error.value = "problem fetching the document";
      }
    );

    watchEffect((onInvalidate) => {
      console.log("unsub");
      onInvalidate(() => unsub());
    });
  };

  return { getDocs, getDoc, document, documents, isPending, error };
};

export default getCollection;
