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
import { IonPage, IonContent, IonButton, useIonRouter } from '@ionic/vue'
import { Auth } from 'aws-amplify'
import ErrorService from '@/services/ErrorService'

let ionRouter = useIonRouter()

async function signOut() {
  try {
    await Auth.signOut()
    await ionRouter.replace('/')
  } catch (error) {
    ErrorService.handleError(error)
  }
}
</script>
