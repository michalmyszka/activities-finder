<script setup lang="ts">
import AppToolbar from '@/components/AppToolbar.vue'
import { IonButton, IonContent, IonInput, IonItem, IonPage, useIonRouter } from '@ionic/vue'
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

function showSignUpPage() {
  router.push({ name: 'SignUp' })
}

function showResetPasswordPage() {
  router.push({ name: 'ResetPassword' })
}
</script>

<template>
  <IonPage>
    <AppToolbar>
      <template #title>{{ $t('login') }}</template>
    </AppToolbar>
    <IonContent>
      <form @submit.prevent="logIn" class="ion-margin">
        <IonItem>
          <IonInput type="email" :placeholder="$t('email')" v-model="email"></IonInput>
        </IonItem>
        <IonItem>
          <IonInput type="password" :placeholder="$t('password')" v-model="password"></IonInput>
        </IonItem>
        <IonButton type="submit" expand="block" :disabled="v$.$invalid"
          >{{ $t('login') }}
        </IonButton>
      </form>
      <div class="ion-margin">
        <IonButton @click="showSignUpPage" expand="block" color="secondary" size="small">{{
          $t('signUp')
        }}</IonButton>
        <IonButton @click="showResetPasswordPage" expand="block" color="secondary" size="small">{{
          $t('resetPassword')
        }}</IonButton>
      </div>
    </IonContent>
  </IonPage>
</template>
