<script setup lang="ts">
import ActivityCategoryFilters from '@/components/ActivityCategoryFilters.vue'
import ActivityItem from '@/components/ActivityItem.vue'
import AppModal from '@/components/AppModal.vue'
import AppToolbar from '@/components/AppToolbar.vue'
import ActivityService from '@/services/ActivityService'
import ErrorService from '@/services/ErrorService'
import { useActivitiesStore } from '@/store/activities'
import { useFiltersStore } from '@/store/filters'
import {
  IonBadge,
  IonButton,
  IonContent,
  IonIcon,
  IonList,
  IonPage,
  onIonViewWillEnter,
} from '@ionic/vue'
import { mapOutline, optionsOutline } from 'ionicons/icons'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

const activitiesStore = useActivitiesStore()
const filtersStore = useFiltersStore()

const { activities } = storeToRefs(activitiesStore)
const { selectedSubcategories } = storeToRefs(filtersStore)
const activitiesOptionsModalOpen = ref(false)

onIonViewWillEnter(() => {
  ActivityService.loadActivityCategories().catch((e) => {
    ErrorService.handleError(e)
  })
  ActivityService.getAllActivities().catch((e) => {
    ErrorService.handleError(e)
  })
})

function showActivitiesOptionsModal() {
  activitiesOptionsModalOpen.value = true
}

function dismissActivitiesOptionsModal() {
  activitiesOptionsModalOpen.value = false
}
</script>

<template>
  <IonPage>
    <AppToolbar>
      <template #end-buttons>
        <IonButton @click="showActivitiesOptionsModal">
          <IonIcon slot="icon-only" :icon="optionsOutline"></IonIcon>
          <IonBadge v-if="selectedSubcategories.length > 0">{{
            selectedSubcategories.length
          }}</IonBadge>
        </IonButton>
        <IonButton>
          <IonIcon slot="icon-only" :icon="mapOutline"></IonIcon>
        </IonButton>
      </template>
    </AppToolbar>
    <IonContent>
      <IonList>
        <ActivityItem v-for="activity in activities" :key="activity.id" :activity="activity">
        </ActivityItem>
      </IonList>
      <AppModal
        :title="$t('viewOptions')"
        :dismiss-button-text="$t('ok')"
        :modal-open="activitiesOptionsModalOpen"
        @dismiss="dismissActivitiesOptionsModal"
      >
        <template #content>
          <ActivityCategoryFilters></ActivityCategoryFilters>
        </template>
      </AppModal>
    </IonContent>
  </IonPage>
</template>
