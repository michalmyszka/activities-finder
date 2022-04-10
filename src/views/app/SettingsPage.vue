<script setup lang="ts">
import AppToolbar from '@/components/AppToolbar.vue'
import AuthService from '@/services/AuthService'
import ErrorService from '@/services/ErrorService'
import { IonButton, IonContent, IonPage, useIonRouter } from '@ionic/vue'

const router = useIonRouter()

async function signOut() {
  try {
    await AuthService.logOut()
    router.push({ name: 'Home' })
  } catch (error) {
    ErrorService.handleError(error)
  }
}
</script>

<template>
  <ion-page>
    <AppToolbar></AppToolbar>
    <ion-content>
      <ion-button expand="block" color="danger" @click="signOut">{{ $t('logOut') }}</ion-button>
    </ion-content>
  </ion-page>
</template>
