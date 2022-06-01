<script setup lang="ts">
import AppToolbar from '@/components/AppToolbar.vue'
import InputWithErrorLabel from '@/components/InputWithErrorLabel.vue'
import { Connection } from '@/models/connection'
import ConnectionService from '@/services/ConnectionService'
import ErrorService from '@/services/ErrorService'
import { useAuthStore } from '@/store/auth'
import { useConnectionsStore } from '@/store/connections'
import {
  IonButton,
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonPage,
  onIonViewWillEnter,
} from '@ionic/vue'
import useVuelidate from '@vuelidate/core'
import { email, required } from '@vuelidate/validators'
import { personAddOutline } from 'ionicons/icons'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import AppModal from '../components/AppModal.vue'

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

const connectionsStore = useConnectionsStore()
const authStore = useAuthStore()

const { pendingConnections, connections } = storeToRefs(connectionsStore)
const { user } = storeToRefs(authStore)

const addConnectionModalOpen = ref(false)
const deleteConnectionModalOpen = ref(false)
let connectionToDelete: Connection | null = null

function openAddConnectionModal() {
  emailAddress.value = ''
  addConnectionModalOpen.value = true
}

function dismissAddConnectionModal() {
  addConnectionModalOpen.value = false
}

function openDeleteConnectionModal(connection: Connection) {
  connectionToDelete = connection
  deleteConnectionModalOpen.value = true
}

function dismissDeleteConnectionModal() {
  connectionToDelete = null
  deleteConnectionModalOpen.value = false
}

const emailAddress = ref('')

const emailValidations = {
  emailAddress: {
    email,
    required,
  },
}

const v$ = useVuelidate(emailValidations, { emailAddress }, { $autoDirty: true })

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

async function acceptConnection(connection: Connection) {
  try {
    await ConnectionService.acceptConnection({
      connectionId: connection.id,
    })
    dismissDeleteConnectionModal()
    getConnections()
  } catch (e) {
    ErrorService.handleError(e)
  }
}

async function deleteConnection() {
  try {
    if (connectionToDelete) {
      await ConnectionService.deleteConnection({
        connectionId: connectionToDelete.id,
      })
      getConnections()
    }
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
      <IonList v-if="pendingConnections.length > 0">
        <IonListHeader>{{ $t('pendingConnections') }}</IonListHeader>
        <IonItem v-for="connection in pendingConnections" :key="connection.id">
          <IonLabel>
            {{connection.getConnectionUser(user!).getNickname() + ' (' + connection.getConnectionUser(user!).getUsername() + ')'}}
          </IonLabel>
          <IonButton
            v-if="connection.pendingAcceptanceFromThisUser(user!)"
            slot="end"
            @click="acceptConnection(connection as Connection)"
            >{{ $t('accept') }}</IonButton
          >
        </IonItem>
      </IonList>
      <IonList v-if="connections.length > 0">
        <IonListHeader>{{ $t('connections') }}</IonListHeader>
        <IonItem v-for="connection in connections" :key="connection.id">
          <IonLabel>
            {{connection.getConnectionUser(user!).getNickname() + ' (' + connection.getConnectionUser(user!).getUsername() + ')'}}
          </IonLabel>
          <IonButton
            slot="end"
            color="danger"
            @click="openDeleteConnectionModal(connection as Connection)"
            >{{ $t('delete') }}</IonButton
          >
        </IonItem>
      </IonList>
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
      <AppModal
        :title="$t('deleteConnection')"
        :dismiss-button-text="$t('cancel')"
        :modal-open="deleteConnectionModalOpen"
        @dismiss="dismissDeleteConnectionModal"
      >
        <template #content>
          <IonButton expand="block" color="danger" @click="deleteConnection()">{{
            $t('delete')
          }}</IonButton>
        </template>
      </AppModal>
    </IonContent>
  </ion-page>
</template>
