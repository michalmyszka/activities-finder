<script setup lang="ts">
import AppToolbar from '@/components/AppToolbar.vue'
import {
  IonBackButton,
  IonButton,
  IonContent,
  IonInput,
  IonItem,
  IonPage,
  useIonRouter,
} from '@ionic/vue'
import { computed, ref } from 'vue'
import AuthService from '../services/AuthService'
import ErrorService from '../services/ErrorService'
import { useRoute } from 'vue-router'

const router = useIonRouter()
const route = useRoute()

const email = ref('')
const password = ref('')

const userInputCorrect = computed(
  () =>
    AuthService.isUsernameValid(email.value) &&
    AuthService.isPasswordValid(password.value)
)

async function logIn() {
  try {
    await AuthService.logIn({
      username: email.value,
      password: password.value,
    })
    if (route.redirectedFrom) {
      router.push(route.redirectedFrom)
    } else {
      router.push({ name: 'App' })
    }
  } catch (e) {
    ErrorService.handleError(e)
  }
}
</script>

<template>
  <ion-page>
    <app-toolbar>
      <template #title>{{ $t('login') }}</template>
      <template #start-buttons>
        <ion-back-button></ion-back-button>
      </template>
    </app-toolbar>
    <ion-content>
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
      <ion-button
        type="submit"
        expand="block"
        :disabled="!userInputCorrect"
        @click="logIn"
        >{{ $t('login') }}
      </ion-button>
      <div class="ion-text-center">
        {{ $t('noAccount') }}
        <a href="/sign-up">{{ $t('signUp') }}</a>
      </div>
      <div class="ion-text-center">
        {{ $t('forgotPassword') }}
        <a href="/reset-password">{{ $t('resetPassword') }}</a>
      </div>
    </ion-content>
  </ion-page>
</template>
