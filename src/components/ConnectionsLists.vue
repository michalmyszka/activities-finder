<script setup lang="ts">
import { Connection } from '@/models/connection'
import ConnectionService from '@/services/ConnectionService'
import ErrorService from '@/services/ErrorService'
import { useAuthStore } from '@/store/auth'
import { useConnectionsStore } from '@/store/connections'
import { IonButton, IonCheckbox, IonItem, IonLabel, IonList, IonListHeader } from '@ionic/vue'
import { storeToRefs } from 'pinia'
import { defineEmits, defineProps, ref } from 'vue'
import AppModal from '../components/AppModal.vue'

defineProps({
  showManagementButtons: { type: Boolean, default: true },
  showSelectionBoxes: { type: Boolean, default: false },
})

const emit = defineEmits<{
  (e: 'connectionsChanged'): void
}>()

const connectionsStore = useConnectionsStore()
const authStore = useAuthStore()

const { pendingConnections, connections } = storeToRefs(connectionsStore)
const { user } = storeToRefs(authStore)

const deleteConnectionModalOpen = ref(false)
let connectionToDelete: Connection | null = null

function openDeleteConnectionModal(connection: Connection) {
  connectionToDelete = connection
  deleteConnectionModalOpen.value = true
}

function dismissDeleteConnectionModal() {
  connectionToDelete = null
  deleteConnectionModalOpen.value = false
}

async function acceptConnection(connection: Connection) {
  try {
    await ConnectionService.acceptConnection({
      connectionId: connection.id,
    })
    emit('connectionsChanged')
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
      dismissDeleteConnectionModal()
      emit('connectionsChanged')
    }
  } catch (e) {
    ErrorService.handleError(e)
  }
}
</script>

<template>
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
      <IonCheckbox slot="start"></IonCheckbox>
      <IonLabel>
        {{connection.getConnectionUser(user!).getNickname() + ' (' + connection.getConnectionUser(user!).getUsername() + ')'}}
      </IonLabel>
      <IonButton
        v-if="showManagementButtons"
        slot="end"
        color="danger"
        @click="openDeleteConnectionModal(connection as Connection)"
        >{{ $t('delete') }}</IonButton
      >
    </IonItem>
  </IonList>

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
</template>
