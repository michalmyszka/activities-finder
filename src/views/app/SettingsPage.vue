<template>
  <ion-page>
    <app-toolbar></app-toolbar>
    <ion-content>
      <ion-button expand="block" color="danger" @click="signOut">
        {{ $t('signOut') }}
      </ion-button>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import AppToolbar from '@/components/AppToolbar.vue'
import { IonButton, IonContent, IonPage } from '@ionic/vue'
import ErrorService from '@/services/ErrorService'

async function signOut() {
  try {
    console.log('Logging out...')
  } catch (error) {
    ErrorService.handleError(error)
  }
}
</script>
