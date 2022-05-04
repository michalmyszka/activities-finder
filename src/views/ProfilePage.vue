<script setup lang="ts">
import AppToolbar from '@/components/AppToolbar.vue'
import CredentialsForm from '@/components/CredentialsForm.vue'
import { CredentialsPayload } from '@/models/auth'
import AuthService from '@/services/AuthService'
import ErrorService from '@/services/ErrorService'
import NotificationService from '@/services/NotificationService'
import { useAuthStore } from '@/store/auth'
import { IonBackButton, IonButton, IonContent, IonPage } from '@ionic/vue'
import { ref } from 'vue'
import AppModal from '../components/AppModal.vue'
import i18n from '../i18n/i18n'

const authStore = useAuthStore()

const emailModalOpen = ref(false)
const passwordModalOpen = ref(false)

function openEmailModal() {
  emailModalOpen.value = true
}

function dismissEmailModal() {
  emailModalOpen.value = false
}

function openPasswordModal() {
  passwordModalOpen.value = true
}

function dismissPasswordModal() {
  passwordModalOpen.value = false
}

async function updateEmail(credentialsPayload: CredentialsPayload) {
  try {
    await AuthService.updateEmail(credentialsPayload)
    NotificationService.showNotification(i18n.global.t('emailUpdated'))
    dismissEmailModal()
  } catch (error) {
    ErrorService.handleError(error)
  }
}

async function updatePassword(credentialsPayload: CredentialsPayload) {
  try {
    await AuthService.updatePassword(credentialsPayload)
    NotificationService.showNotification(i18n.global.t('passwordUpdated'))
    dismissPasswordModal()
  } catch (error) {
    ErrorService.handleError(error)
  }
}
</script>

<template>
  <ion-page>
    <AppToolbar>
      <template #title>{{ $t('profile') }}</template>
      <template #start-buttons>
        <IonBackButton default-href="" :text="$t('back')"></IonBackButton>
      </template>
    </AppToolbar>
    <IonContent class="ion-padding">
      <IonButton @click="openEmailModal" expand="block" class="ion-margin-top">{{
        $t('updateEmail')
      }}</IonButton>
      <IonButton @click="openPasswordModal" expand="block" class="ion-margin-top">{{
        $t('updatePassword')
      }}</IonButton>
      <AppModal
        :title="$t('updateEmail')"
        :modal-open="emailModalOpen"
        @dismiss="dismissEmailModal"
      >
        <template #content>
          <CredentialsForm
            :show-password-input="false"
            :email="authStore.user?.getEmail()"
            :submit-button-text="$t('submit')"
            @submit="updateEmail"
          ></CredentialsForm>
        </template>
      </AppModal>
      <AppModal
        :title="$t('updatePassword')"
        :modal-open="passwordModalOpen"
        @dismiss="dismissPasswordModal"
      >
        <template #content>
          <CredentialsForm
            :show-email-input="false"
            :submit-button-text="$t('submit')"
            @submit="updatePassword"
          ></CredentialsForm>
        </template>
      </AppModal>
    </IonContent>
  </ion-page>
</template>
