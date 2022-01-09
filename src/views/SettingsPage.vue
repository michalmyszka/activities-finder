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
import { IonButton, IonContent, IonPage, useIonRouter } from '@ionic/vue'
import { Auth } from 'aws-amplify'
import ErrorService from '@/services/ErrorService'
import { DataStore } from '@aws-amplify/datastore'

let ionRouter = useIonRouter()

async function signOut() {
  try {
    await Auth.signOut()
    await DataStore.clear()
    await ionRouter.replace('/')
  } catch (error) {
    ErrorService.handleError(error)
  }
}
</script>
