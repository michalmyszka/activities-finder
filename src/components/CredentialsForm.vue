<script setup lang="ts">
import InputWithErrorLabel from '@/components/InputWithErrorLabel.vue'
import { CredentialsPayload } from '@/models/auth'
import { passwordValidator } from '@/utils'
import { IonButton, IonItem } from '@ionic/vue'
import useVuelidate from '@vuelidate/core'
import { email, required, sameAs } from '@vuelidate/validators'
import { defineEmits, defineProps, ref } from 'vue'

const props = defineProps({
  email: { type: String, default: '' },
  submitButtonText: { type: String, required: true },
})

const emit = defineEmits<{
  (e: 'submit', payload: CredentialsPayload): void
}>()

const emailAddress = ref(props.email)
const password = ref('')
const confirmPassword = ref('')

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

function submit() {
  let payload: CredentialsPayload = {
    username: emailAddress.value,
    password: password.value,
    email: emailAddress.value,
  }
  emit('submit', payload)
}
</script>

<template>
  <form @submit.prevent="submit">
    <IonItem>
      <InputWithErrorLabel
        :error="v$.emailAddress.$error"
        :error-message="$t('invalidEmail')"
        input-type="email"
        :placeholder="$t('email')"
        v-model="emailAddress"
      ></InputWithErrorLabel>
    </IonItem>
    <IonItem>
      <InputWithErrorLabel
        :error="v$.password.$error"
        :error-message="$t('invalidPassword')"
        input-type="password"
        :placeholder="$t('password')"
        v-model="password"
      ></InputWithErrorLabel>
    </IonItem>
    <IonItem>
      <InputWithErrorLabel
        :error="v$.confirmPassword.$error"
        :error-message="$t('passwordsDontMatch')"
        input-type="password"
        :placeholder="$t('confirmPassword')"
        v-model="confirmPassword"
      ></InputWithErrorLabel>
    </IonItem>
    <ion-button type="submit" expand="block" :disabled="v$.$invalid">{{
      props.submitButtonText
    }}</ion-button>
  </form>
</template>
