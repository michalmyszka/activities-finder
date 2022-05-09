<script setup lang="ts">
import AppToolbar from '@/components/AppToolbar.vue'
import { IonButton, IonContent, IonModal } from '@ionic/vue'
import { defineEmits, defineProps } from 'vue'

defineProps({
  title: { type: String, default: '' },
  dismissButtonText: { type: String, required: true },
  modalOpen: { type: Boolean, default: false },
})

const emit = defineEmits<{
  (e: 'dismiss'): void
}>()

function dismissModal() {
  emit('dismiss')
}
</script>

<template>
  <IonModal :is-open="modalOpen">
    <AppToolbar>
      <template #title>{{ title }}</template>
      <template #end-buttons>
        <IonButton @click="dismissModal">{{ dismissButtonText }}</IonButton>
      </template>
    </AppToolbar>
    <IonContent>
      <slot name="content"></slot>
    </IonContent>
  </IonModal>
</template>
