<script setup lang="ts">
import { IonTextarea, IonLabel } from '@ionic/vue'
import { defineEmits, defineProps } from 'vue'

defineProps({
  modelValue: { type: String, required: true },
  error: { type: Boolean, required: true },
  errorMessage: { type: String, required: true },
  placeholder: { type: String, required: true },
})

defineEmits(['update:modelValue'])
</script>

<template>
  <IonLabel v-if="error" color="danger" position="stacked">{{ errorMessage }}</IonLabel>
  <IonLabel v-else color="primary"></IonLabel>
  <IonTextarea
    :placeholder="placeholder"
    :value="modelValue"
    auto-grow="true"
    @input="$emit('update:modelValue', $event.target.value)"
  ></IonTextarea>
</template>
