<script setup lang="ts">
import Input from '../components/Input.vue'
import Button from '../components/Button.vue'
import { reactive, ref, computed } from 'vue';
import { useUserStore } from '../stores/user';
import type { PublicUser } from 'src/shared/types/User';
const userStore = useUserStore();

const signupForm = reactive({
  username: '',
  email: '',
  birthDate: '',
  password: '',
  confirmPassword: '',
  loading: false
});
const responseText = ref<string | undefined>(undefined);
const responseType = ref<'success' | 'error' | undefined>(undefined);
const submitSignup = async (e: any) => {
  console.log(e)
  signupForm.loading = true;
  try {
    const myUser = await userStore.signup({
      username: signupForm.username,
      email: signupForm.email,
      birthDate: signupForm.birthDate,
      password: signupForm.password,
    });
    userStore.userData = myUser as PublicUser;
    responseType.value = 'success';
    responseText.value = 'Signed up successfully!'
  } catch (err) {
    responseText.value = 'There was a problem signing you up :('
    responseType.value = 'error';
  }
  signupForm.loading= false;
}
const formIsComplete = computed(() => {
  return signupForm.username && signupForm.birthDate && signupForm.password && signupForm.email && signupForm.confirmPassword && signupForm.password === signupForm.confirmPassword
})

</script>

<template>
  <main class="p-5">
    <form @submit.prevent="submitSignup" aria-label="Signup Form"
      class="bg-navy-dark rounded-lg p-10 lg:w-1/2 max-w-[600px] flex flex-col ">
      <h2 class="text-center">Welcome to the League, Summoner</h2>
      <section class="flex flex-col items-stretch w-[400px]">
        <h4 class="opacity-50 mt-8">New Account</h4>

        <Input name="username" required v-model="signupForm.username" type="text" placeholder="Enter a username"
          class="mb-5" label="Username" />
        <Input name="birthDate" required v-model="signupForm.birthDate" type="text" placeholder="MM-DD-YYYY" class="mb-5"
          label="Date of Birth" />
        <Input name="email" required v-model="signupForm.email" type="email" placeholder="Enter your email address"
          class="mb-5" label="Email Address" />
        <Input name="password" required v-model="signupForm.password" type="password" placeholder="Enter a password"
          class="mb-5" label="Password" />
        <Input name="confirmPassword" required v-model="signupForm.confirmPassword" type="password"
          placeholder="Confirm your password" class="mb-5" label="Confirm Password" />
        <Button type="submit" text="Sign Up" color="green" class="mr-5 mb-5" :feedback-type="responseType"
          :disabled="!formIsComplete" :feedback-text="responseText" :loading="signupForm.loading" />
      </section>
    </form>
  </main>
</template>
