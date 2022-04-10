<script setup lang="ts">
import AppToolbar from '@/components/AppToolbar.vue'
import ErrorService from '@/services/ErrorService'
import { IonBackButton, IonButton, IonContent, IonInput, IonItem, IonPage } from '@ionic/vue'
import { ref } from 'vue'
import AuthService from '../services/AuthService'

const email = ref('')
const resetPasswordRequested = ref(false)

async function resetPassword() {
  try {
    await AuthService.resetPassword({
      email: email.value,
    })
    resetPasswordRequested.value = true
  } catch (e) {
    ErrorService.handleError(e)
  }
}
</script>

<template>
  <ion-page>
    <AppToolbar>
      <template #title>{{ $t('resetPassword') }}</template>
      <template #start-buttons>
        <ion-back-button></ion-back-button>
      </template>
    </AppToolbar>
    <ion-content>
      <div v-if="!resetPasswordRequested">
        <ion-item>
          <ion-input :placeholder="$t('email')" v-model="email"></ion-input>
        </ion-item>
        <ion-button type="submit" expand="block" @click="resetPassword">{{
          $t('resetPassword')
        }}</ion-button>
      </div>
      <div v-else>
        <ion-item>{{ $t('resetPasswordRequested') }}</ion-item>
      </div>
    </ion-content>
  </ion-page>
</template>
