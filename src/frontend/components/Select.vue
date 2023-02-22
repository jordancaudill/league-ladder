<script setup lang="ts">
import { computed } from 'vue';


const props = defineProps<{
    label: string
    name: string
    placeholder: string
    required?: boolean
    disabled?: boolean
    modelValue: string;
    options: {
        value: string
        text: string
    }[]
}>()
const emit = defineEmits(['update:modelValue']);

const internalValue = computed({
    get() {
        return props.modelValue;
    },
    set(newValue: string) {
        return emit('update:modelValue', newValue);
    }
})
</script>

<template>
    <div class="flex flex-col">
        <label :for="name">{{ label }} <span v-if="required" class="text-red">*</span></label>
        <select v-model="internalValue" :required="required" :disabled="disabled" :placeholder="placeholder" :name="name"
            :label="label">
            <option default :value="undefined">{{ placeholder }}</option>
            <option v-for="option in options" :value="option.value">{{ option.text }}</option>
        </select>
    </div>
</template>
