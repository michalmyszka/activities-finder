<script setup lang="ts">
import { IonLabel, IonSelect, IonSelectOption } from '@ionic/vue'
import { defineEmits, defineProps } from 'vue'

defineProps({
  modelValue: { required: true },
  label: { type: String, required: true },
  okText: { type: String, required: true },
  cancelText: { type: String, required: true },
  options: { type: Array, required: true },
  optionDisplayFunction: { type: Function, required: true },
  // error: { type: Boolean, required: true },
  // errorMessage: { type: String, required: true },
})

defineEmits(['update:modelValue'])
</script>

<template>
  <ion-label>{{ label }}</ion-label>
  <ion-select
    :ok-text="okText"
    :cancel-text="cancelText"
    :value="modelValue"
    @ionChange="$emit('update:modelValue', $event.target.value)"
  >
    <ion-select-option v-for="option in options" :key="option" :value="option"
      >{{ optionDisplayFunction(option) }}
    </ion-select-option>
  </ion-select>
</template>
