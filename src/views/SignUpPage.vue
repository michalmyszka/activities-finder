<script setup lang="ts">
import AppToolbar from '@/components/AppToolbar.vue'
import CredentialsForm from '@/components/CredentialsForm.vue'
import { CredentialsPayload } from '@/models/auth'
import ErrorService from '@/services/ErrorService'
import { IonBackButton, IonContent, IonItem, IonPage } from '@ionic/vue'
import { ref } from 'vue'
import AuthService from '../services/AuthService'

const awaitingEmailConfirmation = ref(false)

async function singUp(payload: CredentialsPayload) {
  try {
    await AuthService.singUp({
      nickname: payload.nickname,
      username: payload.username,
      password: payload.password,
      email: payload.email,
    })
    awaitingEmailConfirmation.value = true
  } catch (e) {
    ErrorService.handleError(e)
  }
}
</script>

<template>
  <IonPage>
    <AppToolbar>
      <template #title>{{ $t('signUp') }}</template>
      <template #start-buttons>
        <IonBackButton default-href="/login" :text="$t('back')"></IonBackButton>
      </template>
    </AppToolbar>
    <IonContent class="ion-padding">
      <CredentialsForm
        v-if="!awaitingEmailConfirmation"
        :show-nickname-input="true"
        :submit-button-text="$t('signUp')"
        @submit="singUp"
      ></CredentialsForm>
      <IonItem v-else>{{ $t('confirmEmail') }}</IonItem>
    </IonContent>
  </IonPage>
</template>
