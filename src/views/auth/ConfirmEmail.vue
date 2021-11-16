<template>
  <form @submit.prevent="handleSubmit">
    <h3>Enter Your Email</h3>
    <input type="email" placeholder="Email" v-model="email" />
    <span class="invalid" v-if="emailError">{{ emailError }}</span>
    <div v-if="error" class="error">{{ error }}</div>
    <router-link class="login" :to="{ name: 'Login' }">Login</router-link>
    <button class="btnLogin" v-if="!isPending">Ok</button>
    <button v-if="isPending" disabled>Loading...</button>
  </form>
</template>

<script>
// using @ means start at the project src root
import { useValidator, usePasswordReset } from "@/composables";
import { ref } from "vue";
import { useRouter } from "vue-router";

export default {
  setup() {
    const { validateEmail, emailError } = useValidator();
    const { sendEmail, error, isPending } = usePasswordReset();
    const router = useRouter();

    const email = ref("");

    const handleSubmit = async () => {
      validateEmail(email);

      if (validateEmail(email)) {
        const res = await sendEmail(email.value);
        if (!error.value) {
          setTimeout(() => {
            router.push({ name: "Login" });
          }, 3000);
        }
      }
    };

    return { email, emailError, handleSubmit, error, isPending };
  },
};
</script>

<style scoped>
.login {
  margin-left: auto;
}

.login:hover {
  text-decoration: underline;
  color: rgb(0, 0, 0);
}

button {
  margin-top: 20px;
}

.link-section {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}

span.invalid {
  color: red;
  margin: 0rem 0.75rem;
}
</style>
