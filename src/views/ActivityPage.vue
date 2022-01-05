<template>
  <ion-page>
    <app-toolbar>
      <template #title>{{ activityId }}</template>
      <template #start-buttons>
        <ion-back-button defaultHref="/app/activities"></ion-back-button>
      </template>
    </app-toolbar>
    <ion-content>
      <div v-if="activity">{{ activity.type }}</div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonBackButton, IonContent, IonPage } from '@ionic/vue'
import AppToolbar from '@/components/AppToolbar.vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { computed } from 'vue'
import { Activity } from '@/models'

const route = useRoute()
const store = useStore()

const activityId = route.params.id
const activity = computed(
  () => store.state.activities.selectedActivity as Activity
)
store.dispatch('activities/getActivityById', {
  activityId: activityId,
})
</script>
