import { ref } from "vue";

const useValidator = () => {
  const emailError = ref("");
  const passwordError = ref("");
  const displayNameError = ref("");

  const validateDisplayName = (displayName) => {
    displayNameError.value = "";
    switch (true) {
      case displayName.value.trim() == "":
        displayNameError.value = "Display Name is required";
        break;

      case displayName.value.length < 3:
        displayNameError.value =
          "Display Name should be at least 3 characters long";
        break;

      case !displayName.value.match(/[a-zA-Z]{3,}/):
        displayNameError.value =
          "Display Name should contain at least 3 characters";
        break;

      case !displayName.value.match(/^[a-zA-Z-\d]{3,}$/):
        displayNameError.value =
          "Display Name cannot contain special characters";
        break;

      default:
        return true;
    }
  };

  const validateEmail = (email) => {
    emailError.value = "";
    switch (true) {
      case email.value.trim() == "":
        emailError.value = "Email is required";
        break;

      case !email.value.match(
        /^([a-z-\.\d]+)@([a-z-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/
      ):
        emailError.value = "Email is not a valid Email";
        break;

      default:
        return true;
    }
  };

  const validatePassword = (password) => {
    passwordError.value = "";
    switch (true) {
      case password.value.trim() == "":
        passwordError.value = "Display Name is required";
        break;

      case password.value.length < 6:
        passwordError.value = "Password should be at least 6 characters long";
        break;

      case !password.value.match(/[a-zA-Z]{3,}/):
        passwordError.value = "Password should contain at least 3 letters";
        break;

      default:
        return true;
    }
  };

  return {
    validateDisplayName,
    validateEmail,
    validatePassword,
    displayNameError,
    emailError,
    passwordError,
  };
};

export default useValidator;
