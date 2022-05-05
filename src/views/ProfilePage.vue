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

const nicknameModalOpen = ref(false)
const emailModalOpen = ref(false)
const passwordModalOpen = ref(false)

function openNicknameModal() {
  nicknameModalOpen.value = true
}

function dismissNicknameModal() {
  nicknameModalOpen.value = false
}

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

async function updateNickname(credentialsPayload: CredentialsPayload) {
  try {
    await AuthService.updateNickname(credentialsPayload)
    NotificationService.showNotification(i18n.global.t('nicknameUpdated'))
    dismissNicknameModal()
  } catch (error) {
    ErrorService.handleError(error)
  }
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
      <IonButton @click="openNicknameModal" expand="block" class="ion-margin-top">{{
        $t('updateNickname')
      }}</IonButton>
      <IonButton @click="openEmailModal" expand="block" class="ion-margin-top">{{
        $t('updateEmail')
      }}</IonButton>
      <IonButton @click="openPasswordModal" expand="block" class="ion-margin-top">{{
        $t('updatePassword')
      }}</IonButton>
      <AppModal
        :title="$t('updateNickname')"
        :modal-open="nicknameModalOpen"
        @dismiss="dismissNicknameModal"
      >
        <template #content>
          <CredentialsForm
            :show-nickname-input="true"
            :show-email-input="false"
            :show-password-input="false"
            :nickname="authStore.user?.getNickname()"
            :submit-button-text="$t('submit')"
            @submit="updateNickname"
          ></CredentialsForm>
        </template>
      </AppModal>
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
