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
  <IonPage>
    <AppToolbar>
      <template #title>{{ $t('resetPassword') }}</template>
      <template #start-buttons>
        <IonBackButton default-href="" :text="$t('back')"></IonBackButton>
      </template>
    </AppToolbar>
    <IonContent>
      <div v-if="!resetPasswordRequested">
        <IonItem>
          <IonInput :placeholder="$t('email')" v-model="email"></IonInput>
        </IonItem>
        <IonButton type="submit" expand="block" @click="resetPassword">{{
          $t('resetPassword')
        }}</IonButton>
      </div>
      <div v-else>
        <IonItem>{{ $t('resetPasswordRequested') }}</IonItem>
      </div>
    </IonContent>
  </IonPage>
</template>
