import { ref, watchEffect } from "vue";
import { projectFirestore } from "../firebase/config";

const useCollection = (collection) => {
  const error = ref(null);
  const isPending = ref(false);

  let docRef = projectFirestore.collection(collection);

  // add a new document
  const addDoc = async (doc) => {
    error.value = null;
    isPending.value = true;

    try {
      const res = await docRef.add(doc);
      isPending.value = false;
      return res;
    } catch (err) {
      console.log(err.message);
      error.value = "could not send the message";
      isPending.value = false;
    }
  };

  const deleteDoc = async (id) => {
    error.value = null;
    isPending.value = true;

    try {
      const res = await docRef.doc(id).delete();
      isPending.value = false;
      return res;
    } catch (err) {
      console.log(err.message);
      isPending.value = false;
      error.value = "could not delete the document";
    }
  };

  const updateDoc = async (id, updates) => {
    error.value = null;
    isPending.value = true;

    try {
      const res = await docRef.doc(id).update(updates);
      isPending.value = false;
      return res;
    } catch (err) {
      console.log(err.message);
      isPending.value = false;
      error.value = "could not update the document";
    }
  };

  return {
    error,
    isPending,
    addDoc,
    deleteDoc,
    updateDoc,
  };
};

export default useCollection;
