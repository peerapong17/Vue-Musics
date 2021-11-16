<template>
  <form @submit.prevent="handleSubmit">
    <h3>Sign up</h3>
    <input type="text" placeholder="Display name" v-model="displayName" />
    <span class="invalid" v-if="displayNameError">{{ displayNameError }}</span>
    <input type="email" placeholder="Email" v-model="email" />
    <span class="invalid" v-if="emailError">{{ emailError }}</span>
    <input type="password" placeholder="Password" v-model="password" />
    <span class="invalid" v-if="passwordError">{{ passwordError }}</span>
    <div v-if="error" class="error">{{ error }}</div>
    <router-link class="login" :to="{ name: 'Login' }">Login</router-link>
    <button v-if="!isPending">Sign up</button>
    <button v-if="isPending" disabled>Loading...</button>
  </form>
</template>

<script>
// using @ means start at the project src root
import { useSignup, useValidator } from "@/composables";
import { ref } from "vue";
import { useRouter } from "vue-router";

export default {
  setup() {
    const { error, signup, isPending } = useSignup();
    const {
      validateEmail,
      validatePassword,
      validateDisplayName,
      emailError,
      passwordError,
      displayNameError,
    } = useValidator();
    const router = useRouter();

    const email = ref("");
    const password = ref("");
    const displayName = ref("");

    const handleSubmit = async () => {
      validateEmail(email);
      validatePassword(password);
      validateDisplayName(displayName);

      if (
        validateEmail(email) &&
        validatePassword(password) &&
        validateDisplayName(displayName)
      ) {
        const res = await signup(
          email.value,
          password.value,
          displayName.value
        );
        if (!error.value) {
          router.push({ name: "UserPlaylists" });
        }
      }
    };

    return {
      email,
      password,
      displayName,
      emailError,
      displayNameError,
      passwordError,
      handleSubmit,
      error,
      isPending,
    };
  },
};
</script>

<style scoped>
.login {
  margin-left: auto;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}

.login:hover {
  text-decoration: underline;
  color: rgb(0, 0, 0);
}
button {
  margin-top: 20px;
}

span.invalid {
  color: red;
  margin: 0rem 0.75rem;
}

input {
  margin-bottom: 0.5rem;
}
</style>
