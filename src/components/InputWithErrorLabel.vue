<script setup lang="ts">
import { IonInput, IonLabel } from '@ionic/vue'
import { defineEmits, defineProps } from 'vue'

defineProps({
  modelValue: { type: String, required: true },
  error: { type: Boolean, required: true },
  errorMessage: { type: String, required: true },
  inputType: { type: String, required: true },
  placeholder: { type: String, required: true },
})

defineEmits(['update:modelValue'])
</script>

<template>
  <IonLabel v-if="error" color="danger" position="stacked">{{ errorMessage }}</IonLabel>
  <IonLabel v-else color="primary"></IonLabel>
  <IonInput
    :type="inputType"
    :placeholder="placeholder"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
  ></IonInput>
</template>
