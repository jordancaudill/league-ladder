<script setup lang="ts">
import Button from '../components/Button.vue'
import Input from '../components/Input.vue'
import Select from '../components/Select.vue'
import { ref } from 'vue'

const loading = ref<boolean>(false);
const responseText = ref<string | undefined>(undefined);
const responseType = ref<'success' | 'error' | undefined>(undefined);
const colors = {
  'bg-navy': '#1C2951',
  'bg-navy-dark': '#121A34',
  'bg-red': '#EC1010',
  'bg-red-dark': '#A11010',
  'bg-blue': '#4091FF',
  'bg-blue-dark': '#2E66B2',
  'bg-green': '#2EB90D',
  'bg-green-dark': '#1E7809',
  'bg-yellow': '#FFD500',
  'bg-gray': '#ACACAC'
}
const selectOptions = [
  { value: 'top', text: 'Top' },
  { value: 'jungle', text: 'Jungle' },
  { value: 'mid', text: 'Mid' },
  { value: 'bot', text: 'Bot' },
  { value: 'support', text: 'Support' },
  { value: 'fill', text: 'Fill' }
]

const asyncLoadData = async () => {
  loading.value = true;
  console.log(message.value)
  setTimeout(() => {
    loading.value = false;
    responseText.value = 'Your data has been updated!';
    responseType.value = 'success';
    setTimeout(() => {
      responseText.value = undefined;
      responseType.value = undefined;
    }, 5000);

  }, 5000);
}
const message = ref<string>('')
  console.log(message.value)
</script>

<template>
  <main class="p-5">
    <h1>h1 header</h1>
    <h2>h2 header</h2>
    <h3>h3 header</h3>
    <h4>h4 header</h4>
    <h5>h5 header - All headers in Poppins font</h5>
    <p>This is a paragraph in Lato font. Lorem ipsum yada yada etc and things. Lorem ipsum is simply dummy text of the
      printing and
      typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown
      printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five
      centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the
      1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing
      software like Aldus PageMaker including versions of Lorem Ipsum.</p>

    <h5 class="mt-8">Colors</h5>
    <section class="flex flex-wrap">
      <div v-for="(color, key) in colors" class="w-32 h-32 text-white p-5" :class="key">
        {{ key }}: {{ color }}
      </div>
    </section>
    <h5 class="mt-8">Buttons</h5>
    <section aria-label="Buttons">

      <Button type="button" :click="asyncLoadData" text="Positive" color="green" class="mr-5 mb-5" :loading="loading"
        :feedback-text="responseText" :feedback-type="responseType" />
      <Button type="button" :click="(p) => { }" text="Neutral" color="blue" class="mr-5 mb-5" />
      <Button type="button" :click="(p) => { }" text="Negative" color="red" class="mr-5 mb-5" />
      <Button type="button" :click="(p) => { }" text="Loading" color="green" :loading="true" class="mr-5 mb-5" />
      <Button type="button" :click="(p) => { }" text="Disabled" color="red" class="mr-5 mb-5" :disabled="true" />
      <Button type="button" :click="(p) => { }" text="Save" color="green" class="mr-5 mb-5" feedback-type="success"
        feedback-text="Your settings have been saved!" />
      <Button type="button" :click="(p) => { }" text="Save" color="green" class="mr-5 mb-5" feedback-type="error"
        feedback-text="Uh oh something happened" />
    </section>
    <h5 class="mt-8">Inputs</h5>
    <section aria-label="Inputs" class="w-96">
     message: {{ message }}
      <Input name="message" v-model="message" type="email" placeholder="Just an email input..." class="mr-5 mb-5" label="Email Address" :model="message" />
      <Input name="message" v-model="message" type="input" placeholder="This is a disabled input..." class="mr-5 mb-5" :disabled="true" :model="message"
        label="Disabled Input" />
      <Input type="input" placeholder="This is a required input..." class="mr-5 mb-5" :required="true" :model="message"
        label="Required Input" name="message" v-model="message"/>
      <Select name="message" placeholder="This is a select..." class="mr-5 mb-5" label="Select" :options="selectOptions"
        :model="message" v-model="message"/>
      <Select name="message" placeholder="This is required..." :required="true" class="mr-5 mb-5" label="Required Select"
        :options="selectOptions" v-model="message" />
      <Select name="message" placeholder="This is disabled..." :disabled="true" class="mr-5 mb-5" label="Disabled Select"
        :options="selectOptions" v-model="message"/>

    </section>
  </main></template>
