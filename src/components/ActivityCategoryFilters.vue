<script setup lang="ts">
import { ActivitySubcategoryFilter } from '@/models/activity'
import { useActivitiesStore } from '@/store/activities'
import {
  IonAccordion,
  IonAccordionGroup,
  IonCheckbox,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
} from '@ionic/vue'
import { storeToRefs } from 'pinia'

const activitiesStore = useActivitiesStore()

const { activityCategoryFilters } = storeToRefs(activitiesStore)

function selectSubcategory(
  activitySubcategoryFilter: ActivitySubcategoryFilter,
  selected: boolean
) {
  activitySubcategoryFilter.selected = selected
}
</script>

<template>
  <IonList inset="true">
    <IonListHeader>{{ $t('activityCategory') }}</IonListHeader>
    <IonAccordionGroup>
      <IonAccordion
        v-for="activityCategoryFilter in activityCategoryFilters"
        :key="activityCategoryFilter"
        :value="activityCategoryFilter"
      >
        <IonItem slot="header">
          <IonLabel>{{ activityCategoryFilter.getCategoryName() }}</IonLabel>
        </IonItem>
        <IonList slot="content">
          <IonItem
            v-for="activitySubcategoryFilter in activityCategoryFilter.subcategoryFilters"
            :key="activitySubcategoryFilter"
            :value="activitySubcategoryFilter"
          >
            <IonCheckbox
              slot="start"
              :checked="activitySubcategoryFilter.selected"
              @update:modelValue="selectSubcategory(activitySubcategoryFilter, $event)"
            >
            </IonCheckbox>
            <IonLabel>{{ activitySubcategoryFilter.subcategory }}</IonLabel>
          </IonItem>
        </IonList>
      </IonAccordion>
    </IonAccordionGroup>
  </IonList>
</template>
