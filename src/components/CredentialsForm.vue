<script setup lang="ts">
import InputWithErrorLabel from '@/components/InputWithErrorLabel.vue'
import { CredentialsPayload } from '@/models/auth'
import { passwordValidator } from '@/utils'
import { IonButton, IonItem } from '@ionic/vue'
import useVuelidate from '@vuelidate/core'
import { email, required, sameAs } from '@vuelidate/validators'
import { defineEmits, defineProps, ref } from 'vue'

const props = defineProps({
  showNicknameInput: { type: Boolean, default: false },
  showEmailInput: { type: Boolean, default: true },
  showPasswordInput: { type: Boolean, default: true },
  nickname: { type: String, default: '' },
  email: { type: String, default: '' },
  submitButtonText: { type: String, required: true },
})

const emit = defineEmits<{
  (e: 'submit', payload: CredentialsPayload): void
}>()

const nickname = ref(props.nickname)
const emailAddress = ref(props.email)
const password = ref('')
const confirmPassword = ref('')

const emailValidations = {
  emailAddress: {
    email,
    required,
  },
}

const passwordValidations = {
  password: {
    passwordValidator,
    required,
  },
  confirmPassword: {
    sameAsPassword: sameAs(password),
    required,
  },
}

const allValidations = {
  nickname: props.showNicknameInput ? { required } : {},
  emailAddress: props.showEmailInput ? emailValidations.emailAddress : {},
  password: props.showPasswordInput ? passwordValidations.password : {},
  confirmPassword: props.showPasswordInput ? passwordValidations.confirmPassword : {},
}

const v$ = useVuelidate(
  allValidations,
  { nickname, emailAddress, password, confirmPassword },
  { $autoDirty: true }
)

function submit() {
  let payload: CredentialsPayload = {
    nickname: nickname.value,
    username: emailAddress.value,
    password: password.value,
    email: emailAddress.value,
  }
  emit('submit', payload)
}
</script>

<template>
  <form @submit.prevent="submit">
    <IonItem v-if="showNicknameInput">
      <InputWithErrorLabel
        :error="v$.nickname.$error"
        :error-message="$t('fieldRequired')"
        input-type="text"
        :placeholder="$t('nickname')"
        v-model="nickname"
      ></InputWithErrorLabel>
    </IonItem>
    <IonItem v-if="showEmailInput">
      <InputWithErrorLabel
        :error="v$.emailAddress.$error"
        :error-message="$t('invalidEmail')"
        input-type="email"
        :placeholder="$t('email')"
        v-model="emailAddress"
      ></InputWithErrorLabel>
    </IonItem>
    <IonItem v-if="showPasswordInput">
      <InputWithErrorLabel
        :error="v$.password.$error"
        :error-message="$t('invalidPassword')"
        input-type="password"
        :placeholder="$t('password')"
        v-model="password"
      ></InputWithErrorLabel>
    </IonItem>
    <IonItem v-if="showPasswordInput">
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
