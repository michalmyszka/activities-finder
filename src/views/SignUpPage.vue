<script setup lang="ts">
import AppToolbar from '@/components/AppToolbar.vue'
import InputWithErrorLabel from '@/components/InputWithErrorLabel.vue'
import ErrorService from '@/services/ErrorService'
import { passwordValidator } from '@/utils'
import { IonBackButton, IonButton, IonContent, IonItem, IonPage } from '@ionic/vue'
import useVuelidate from '@vuelidate/core'
import { email, required, sameAs } from '@vuelidate/validators'
import { ref } from 'vue'
import AuthService from '../services/AuthService'

const emailAddress = ref('')
const password = ref('')
const confirmPassword = ref('')
const awaitingEmailConfirmation = ref(false)

const validations = {
  emailAddress: {
    email,
    required,
  },
  password: {
    passwordValidator,
    required,
  },
  confirmPassword: {
    sameAsPassword: sameAs(password),
    required,
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
          <input-with-error-label
            :error="v$.emailAddress.$error"
            :error-message="$t('invalidEmail')"
            input-type="email"
            :placeholder="$t('email')"
            v-model="emailAddress"
          ></input-with-error-label>
        </ion-item>
        <ion-item>
          <input-with-error-label
            :error="v$.password.$error"
            :error-message="$t('invalidPassword')"
            input-type="password"
            :placeholder="$t('password')"
            v-model="password"
          ></input-with-error-label>
        </ion-item>
        <ion-item>
          <input-with-error-label
            :error="v$.confirmPassword.$error"
            :error-message="$t('passwordsDontMatch')"
            input-type="password"
            :placeholder="$t('confirmPassword')"
            v-model="confirmPassword"
          ></input-with-error-label>
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
