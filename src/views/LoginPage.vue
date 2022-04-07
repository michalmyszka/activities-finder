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
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import AuthService from '../services/AuthService'
import ErrorService from '../services/ErrorService'

const router = useIonRouter()
const route = useRoute()

const email = ref('')
const password = ref('')

const validations = {
  email: {
    required,
  },
  password: {
    required,
  },
}

const v$ = useVuelidate(validations, { email, password }, { $autoDirty: true })

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
      <form @submit.prevent="logIn">
        <ion-item>
          <ion-input type="email" :placeholder="$t('email')" v-model="email"></ion-input>
        </ion-item>
        <ion-item>
          <ion-input type="password" :placeholder="$t('password')" v-model="password"></ion-input>
        </ion-item>
        <ion-button type="submit" expand="block" :disabled="v$.$invalid"
          >{{ $t('login') }}
        </ion-button>
      </form>
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
