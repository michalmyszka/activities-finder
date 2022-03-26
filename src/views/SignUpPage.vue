<script setup lang="ts">
import AppToolbar from '@/components/AppToolbar.vue'
import ErrorService from '@/services/ErrorService'
import {
  IonBackButton,
  IonButton,
  IonContent,
  IonInput,
  IonItem,
  IonPage,
} from '@ionic/vue'
import { computed, ref } from 'vue'
import AuthService from '../services/AuthService'

const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const awaitingEmailConfirmation = ref(false)

const userInputCorrect = computed(
  () =>
    AuthService.isUsernameValid(email.value) &&
    AuthService.isPasswordValid(password.value) &&
    password.value == confirmPassword.value
)

async function singUp() {
  try {
    await AuthService.singUp({
      username: email.value,
      password: password.value,
      email: email.value,
    })
    awaitingEmailConfirmation.value = true
  } catch (e) {
    ErrorService.handleError(e)
  }
}
</script>

<template>
  <ion-page>
    <app-toolbar>
      <template #title>{{ $t('signUp') }}</template>
      <template #start-buttons>
        <ion-back-button></ion-back-button>
      </template>
    </app-toolbar>
    <ion-content>
      <div v-if="!awaitingEmailConfirmation">
        <ion-item>
          <ion-input :placeholder="$t('email')" v-model="email"></ion-input>
        </ion-item>
        <ion-item>
          <ion-input
            type="password"
            :placeholder="$t('password')"
            v-model="password"
          ></ion-input>
        </ion-item>
        <ion-item>
          <ion-input
            type="password"
            :placeholder="$t('confirmPassword')"
            v-model="confirmPassword"
          ></ion-input>
        </ion-item>
        <ion-button
          type="submit"
          expand="block"
          :disabled="!userInputCorrect"
          @click="singUp"
          >{{ $t('signUp') }}</ion-button
        >
      </div>
      <div v-else>
        <ion-item>{{ $t('confirmEmail') }}</ion-item>
      </div>
    </ion-content>
  </ion-page>
</template>
