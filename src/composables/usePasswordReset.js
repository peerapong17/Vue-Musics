import { projectAuth } from "../firebase/config";
import { ref } from "vue";

const usePasswordReset = () => {
  const error = ref("");
  const isPending = ref(false);

  const sendEmail = async (email) => {
    isPending.value = true;
    try {
      const res = await projectAuth.sendPasswordResetEmail(email);
      console.log(res);
      isPending.value = false;
    } catch (err) {
      console.log(err);
      error.value = err.message;
      isPending.value = false;
    }
  };

  return { sendEmail, error, isPending };
};

export default usePasswordReset;
