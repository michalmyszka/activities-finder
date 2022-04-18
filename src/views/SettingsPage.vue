<script setup lang="ts">
import AppToolbar from '@/components/AppToolbar.vue'
import CredentialsForm from '@/components/CredentialsForm.vue'
import { CredentialsPayload } from '@/models/auth'
import AuthService from '@/services/AuthService'
import ErrorService from '@/services/ErrorService'
import { useAuthStore } from '@/store/auth'
import { IonButton, IonContent, IonPage, useIonRouter } from '@ionic/vue'

const router = useIonRouter()
const authStore = useAuthStore()

async function updateCredentials(credentialsPayload: CredentialsPayload) {
  try {
    await AuthService.updateCredentials(credentialsPayload)
  } catch (error) {
    ErrorService.handleError(error)
  }
}

async function signOut() {
  try {
    await AuthService.logOut()
    router.push({ name: 'Login' })
  } catch (error) {
    ErrorService.handleError(error)
  }
}
</script>

<template>
  <ion-page>
    <AppToolbar></AppToolbar>
    <IonContent>
      <h1>{{ $t('credentials') }}</h1>
      <CredentialsForm
        :email="authStore.user?.getEmail()"
        :submit-button-text="$t('update')"
        @submit="updateCredentials"
      ></CredentialsForm>
      <IonButton expand="block" color="danger" @click="signOut" class="ion-margin-top">{{
        $t('logOut')
      }}</IonButton>
    </IonContent>
  </ion-page>
</template>
