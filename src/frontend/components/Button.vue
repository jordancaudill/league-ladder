<script setup lang="ts">

const props = defineProps<{
    text: string
    disabled?: boolean
    loading?: boolean
    color: 'green' | 'blue' | 'red'
    click?: ((payload: MouseEvent) => void) | undefined
    type: 'button' | 'submit'
    feedbackText?: string
    feedbackType?: 'success' | 'error'
}>()
const backgroundColors = {
    disabled: 'bg-gray opacity-50',
    green: 'bg-green hover:bg-green-dark',
    blue: 'bg-blue hover:bg-blue-dark',
    red: 'bg-red hover:bg-red-dark'
};
const normalColor = backgroundColors[props.color];
</script>

<template>
    <div> 
        <button :disabled="disabled || loading || !!feedbackType" :class="[
            (disabled || feedbackType || loading) ? backgroundColors.disabled : normalColor
        ]" @click="click" >
            <font-awesome-icon v-if="loading" icon="fa-solid fa-circle-notch" class="animate-spin fill-white" />
            {{
                loading ? '' : (feedbackType || text)
            }}
        </button>

        <p class="mt-3">
            <span v-if="feedbackType === 'error'" class="text-red">* </span>
            <span :class="feedbackType === 'error' ? 'text-white' : 'text-green'">{{ feedbackText }}</span>
        </p>
    </div>
</template>
