<script setup lang="ts">
import AppToolbar from '@/components/AppToolbar.vue'
import InputWithErrorLabel from '@/components/InputWithErrorLabel.vue'
import ConnectionService from '@/services/ConnectionService'
import ErrorService from '@/services/ErrorService'
import { IonButton, IonContent, IonIcon, IonItem, IonPage, onIonViewWillEnter } from '@ionic/vue'
import useVuelidate from '@vuelidate/core'
import { email, required } from '@vuelidate/validators'
import { personAddOutline } from 'ionicons/icons'
import { ref } from 'vue'
import AppModal from '../components/AppModal.vue'
import ConnectionsLists from '@/components/ConnectionsLists.vue'

onIonViewWillEnter(() => {
  getConnections()
})

function getConnections() {
  ConnectionService.getMyConnections().catch((e) => {
    ErrorService.handleError(e)
  })
  ConnectionService.getMyPendingConnections().catch((e) => {
    ErrorService.handleError(e)
  })
}

const emailAddress = ref('')

const emailValidations = {
  emailAddress: {
    email,
    required,
  },
}

const v$ = useVuelidate(emailValidations, { emailAddress }, { $autoDirty: true })

const addConnectionModalOpen = ref(false)

function openAddConnectionModal() {
  emailAddress.value = ''
  addConnectionModalOpen.value = true
}

function dismissAddConnectionModal() {
  addConnectionModalOpen.value = false
}

async function addConnection() {
  try {
    await ConnectionService.addConnection({
      email: emailAddress.value,
    })
    dismissAddConnectionModal()
    getConnections()
  } catch (e) {
    ErrorService.handleError(e)
  }
}
</script>

<template>
  <ion-page>
    <AppToolbar>
      <template #title>{{ $t('connections') }}</template>
      <template #end-buttons>
        <IonButton @click="openAddConnectionModal">
          <IonIcon slot="icon-only" :icon="personAddOutline"></IonIcon>
        </IonButton>
      </template>
    </AppToolbar>
    <IonContent>
      <ConnectionsLists @connections-changed="getConnections()"></ConnectionsLists>
      <AppModal
        :title="$t('addConnection')"
        :dismiss-button-text="$t('cancel')"
        :modal-open="addConnectionModalOpen"
        @dismiss="dismissAddConnectionModal"
      >
        <template #content>
          <IonItem>
            <InputWithErrorLabel
              :error="v$.emailAddress.$error"
              :error-message="$t('invalidEmail')"
              input-type="email"
              :placeholder="$t('email')"
              v-model="emailAddress"
            ></InputWithErrorLabel>
          </IonItem>
          <IonButton expand="block" @click="addConnection" :disabled="v$.$invalid">{{
            $t('submit')
          }}</IonButton>
        </template>
      </AppModal>
    </IonContent>
  </ion-page>
</template>
