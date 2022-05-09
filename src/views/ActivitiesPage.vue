<script setup lang="ts">
import ActivityItem from '@/components/ActivityItem.vue'
import AppModal from '@/components/AppModal.vue'
import AppToolbar from '@/components/AppToolbar.vue'
import ActivityService from '@/services/ActivityService'
import ErrorService from '@/services/ErrorService'
import { useActivitiesStore } from '@/store/activities'
import {
  IonAccordion,
  IonAccordionGroup,
  IonButton,
  IonCheckbox,
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonPage,
  onIonViewWillEnter,
} from '@ionic/vue'
import { mapOutline, optionsOutline } from 'ionicons/icons'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

const activitiesStore = useActivitiesStore()

const { activities } = storeToRefs(activitiesStore)
const { activityCategories } = storeToRefs(activitiesStore)
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
          <IonList inset="true">
            <IonListHeader>{{ $t('activityCategory') }}</IonListHeader>
            <IonAccordionGroup>
              <IonAccordion
                v-for="activityCategory in activityCategories"
                :key="activityCategory"
                :value="activityCategory"
              >
                <IonItem slot="header">
                  <IonLabel>{{ activityCategory.getName() }}</IonLabel>
                </IonItem>
                <IonList slot="content">
                  <IonItem>
                    <IonCheckbox> </IonCheckbox>
                    <IonLabel>{{ $t('selectAll') }}</IonLabel>
                  </IonItem>
                  <IonItem
                    v-for="activitySubcategory in activityCategory.getSubcategories()"
                    :key="activitySubcategory"
                    :value="activitySubcategory"
                  >
                    <IonCheckbox :value="activitySubcategory"> </IonCheckbox>
                    <IonLabel>{{ activitySubcategory }}</IonLabel>
                  </IonItem>
                </IonList>
              </IonAccordion>
            </IonAccordionGroup>
          </IonList>
        </template>
      </AppModal>
    </IonContent>
  </IonPage>
</template>
