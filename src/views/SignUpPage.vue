<script setup lang="ts">
import AppToolbar from '@/components/AppToolbar.vue'
import ErrorService from '@/services/ErrorService'
import { passwordValidator } from '@/utils'
import {
  IonBackButton,
  IonButton,
  IonContent,
  IonInput,
  IonItem,
  IonPage,
  IonLabel,
} from '@ionic/vue'
import useVuelidate from '@vuelidate/core'
import { email, sameAs } from '@vuelidate/validators'
import { ref } from 'vue'
import AuthService from '../services/AuthService'

const emailAddress = ref('')
const password = ref('')
const confirmPassword = ref('')
const awaitingEmailConfirmation = ref(false)

const validations = {
  emailAddress: {
    email,
  },
  password: {
    passwordValidator,
  },
  confirmPassword: {
    sameAsPassword: sameAs(password),
  },
}

const v$ = useVuelidate(
  validations,
  { emailAddress, password, confirmPassword },
  { $autoDirty: true }
)

async function singUp() {
  try {
    await AuthService.singUp({
      username: emailAddress.value,
      password: password.value,
      email: emailAddress.value,
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
      <form @submit.prevent="singUp" v-if="!awaitingEmailConfirmation">
        <ion-item>
          <ion-label v-if="v$.emailAddress.$error" color="danger" position="stacked">{{
            $t('invalidEmail')
          }}</ion-label>
          <ion-label v-else color="primary"></ion-label>
          <ion-input :placeholder="$t('email')" v-model="emailAddress"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label v-if="v$.password.$error" color="danger" position="stacked">{{
            $t('invalidPassword')
          }}</ion-label>
          <ion-label v-else color="primary"></ion-label>
          <ion-input type="password" :placeholder="$t('password')" v-model="password"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label v-if="v$.confirmPassword.$error" color="danger" position="stacked">{{
            $t('passwordsDontMatch')
          }}</ion-label>
          <ion-label v-else color="primary"></ion-label>
          <ion-input
            type="password"
            :placeholder="$t('confirmPassword')"
            v-model="confirmPassword"
          ></ion-input>
        </ion-item>
        <ion-button type="submit" expand="block" :disabled="v$.$invalid">{{
          $t('signUp')
        }}</ion-button>
      </form>
      <div v-else>
        <ion-item>{{ $t('confirmEmail') }}</ion-item>
      </div>
    </ion-content>
  </ion-page>
</template>
