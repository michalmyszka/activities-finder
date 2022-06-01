<script setup lang="ts">
import AppToolbar from '@/components/AppToolbar.vue'
import ConnectionsLists from '@/components/ConnectionsLists.vue'
import { Activity } from '@/models/activity'
import ActivityService from '@/services/ActivityService'
import ConnectionService from '@/services/ConnectionService'
import ErrorService from '@/services/ErrorService'
import { IonBackButton, IonContent, IonPage, onIonViewWillEnter } from '@ionic/vue'
import { ref } from 'vue'
import { useRoute } from 'vue-router'

onIonViewWillEnter(() => {
  ActivityService.getActivityById({
    activityId: activityId,
  })
    .then((fetchedActivity) => {
      activity.value = fetchedActivity
    })
    .catch((e) => {
      ErrorService.handleError(e)
    })
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

const route = useRoute()

const activityId = route.params.id as string
let activity = ref<Activity>()
</script>

<template>
  <IonPage>
    <AppToolbar>
      <template #title>{{ $t('manage') }}</template>
      <template #start-buttons>
        <IonBackButton
          :default-href="'/my-activities/' + activityId + '/manage'"
          :text="$t('back')"
        ></IonBackButton>
      </template>
    </AppToolbar>
    <IonContent>
      <ConnectionsLists
        :show-management-buttons="false"
        :show-selection-boxes="true"
        @connections-changed="getConnections()"
      ></ConnectionsLists>
    </IonContent>
  </IonPage>
</template>
