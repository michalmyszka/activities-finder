<script setup lang="ts">
import AppToolbar from '@/components/AppToolbar.vue'
import AuthService from '@/services/AuthService'
import ErrorService from '@/services/ErrorService'
import { IonButton, IonContent, IonPage } from '@ionic/vue'

async function signOut() {
  try {
    await AuthService.logOut()
  } catch (error) {
    ErrorService.handleError(error)
  }
}
</script>

<template>
  <ion-page>
    <app-toolbar></app-toolbar>
    <ion-content>
      <ion-button expand="block" color="danger" @click="signOut">{{
        $t('signOut')
      }}</ion-button>
    </ion-content>
  </ion-page>
</template>
