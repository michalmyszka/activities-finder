<script setup lang="ts">
import ActivityCategoryFilters from '@/components/ActivityCategoryFilters.vue'
import ActivityItem from '@/components/ActivityItem.vue'
import ActivityPlaceFilters from '@/components/ActivityPlaceFilters.vue'
import AppModal from '@/components/AppModal.vue'
import AppToolbar from '@/components/AppToolbar.vue'
import { Activity } from '@/models/activity'
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
  useIonRouter,
} from '@ionic/vue'
import { optionsOutline } from 'ionicons/icons'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

const activitiesStore = useActivitiesStore()
const filtersStore = useFiltersStore()
const router = useIonRouter()

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

function showActivityPage(activity: Activity) {
  router.push({ name: 'Activity', params: { id: activity.id } })
}

function showActivitiesOptionsModal() {
  activitiesOptionsModalOpen.value = true
}

async function dismissActivitiesOptionsModal() {
  try {
    activitiesOptionsModalOpen.value = false
    await ActivityService.getAllActivities()
  } catch (e) {
    ErrorService.handleError(e)
  }
}
</script>

<template>
  <IonPage>
    <AppToolbar>
      <template #title>{{ $t('activities') }}</template>
      <template #end-buttons>
        <IonButton @click="showActivitiesOptionsModal">
          <IonIcon slot="icon-only" :icon="optionsOutline"></IonIcon>
          <IonBadge v-if="selectedSubcategories.length > 0">{{
            selectedSubcategories.length
          }}</IonBadge>
        </IonButton>
      </template>
    </AppToolbar>
    <IonContent>
      <IonList>
        <ActivityItem
          v-for="activity in activities"
          :key="activity.id"
          :activity="activity"
          @click="showActivityPage(activity)"
        >
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
          <ActivityPlaceFilters></ActivityPlaceFilters>
        </template>
      </AppModal>
    </IonContent>
  </IonPage>
</template>
