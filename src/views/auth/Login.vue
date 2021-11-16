<template>
  <form @submit.prevent="handleSubmit">
    <h3>Login</h3>
    <input type="email" placeholder="Email" v-model="email" />
    <input type="password" placeholder="Password" v-model="password" />
    <div v-if="error" class="error">{{ error }}</div>
    <div class="link-section">
      <router-link class="forgetPassword" :to="{ name: 'ConfirmEmail' }"
        >Forget Password</router-link
      >
      <router-link class="register" :to="{ name: 'Signup' }"
        >Register</router-link
      >
    </div>
    <button class="btnLogin" v-if="!isPending">Log in</button>
    <button v-if="isPending" disabled>Loading...</button>
  </form>
</template>

<script>
// using @ means start at the project src root
import { useLogin } from "@/composables";
import { ref } from "vue";
import { useRouter } from "vue-router";

export default {
  setup() {
    const { error, login, isPending } = useLogin();
    const router = useRouter();

    const email = ref("");
    const password = ref("");

    const handleSubmit = async () => {
      const res = await login(email.value, password.value);
      if (!error.value) {
        router.push({ name: "UserPlaylists" });
      }
    };

    return { email, password, handleSubmit, error, isPending };
  },
};
</script>

<style scoped>
/* .register {
  margin-left: auto;
} */

.register:hover, .forgetPassword:hover {
  text-decoration: underline;
  color: rgb(0, 0, 0);
}



button {
  margin-top: 20px;
}

.link-section{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}
</style>
