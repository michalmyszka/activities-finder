<script setup lang="ts">
import { SubcategoryFilter } from '@/models/filter'
import ActivityService from '@/services/ActivityService'
import ErrorService from '@/services/ErrorService'
import { useFiltersStore } from '@/store/filters'
import {
  IonAccordion,
  IonAccordionGroup,
  IonBadge,
  IonButton,
  IonCheckbox,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
} from '@ionic/vue'
import { storeToRefs } from 'pinia'

const filtersStore = useFiltersStore()

const { categoryFilters } = storeToRefs(filtersStore)

async function selectSubcategory(subcategoryFilter: SubcategoryFilter, selected: boolean) {
  try {
    subcategoryFilter.selected = selected
    await ActivityService.getAllActivities()
  } catch (e) {
    ErrorService.handleError(e)
  }
}

function clearAll() {
  categoryFilters.value.forEach((categoryFilter) => categoryFilter.deselectAll())
}
</script>

<template>
  <IonList inset="true">
    <IonListHeader>
      <IonLabel>{{ $t('activityCategory') }}</IonLabel>
      <IonButton @click="clearAll">{{ $t('clearAll') }}</IonButton>
    </IonListHeader>
    <IonAccordionGroup>
      <IonAccordion
        v-for="categoryFilter in categoryFilters"
        :key="categoryFilter"
        :value="categoryFilter"
      >
        <IonItem slot="header">
          <IonLabel>{{ categoryFilter.category }}</IonLabel>
          <IonBadge v-if="categoryFilter.getSelectedSubcategories().length > 0">{{
            categoryFilter.getSelectedSubcategories().length
          }}</IonBadge>
        </IonItem>
        <IonList slot="content">
          <IonItem
            v-for="subcategoryFilter in categoryFilter.subcategories"
            :key="subcategoryFilter"
            :value="subcategoryFilter"
          >
            <IonCheckbox
              slot="start"
              :checked="subcategoryFilter.selected"
              @update:modelValue="selectSubcategory(subcategoryFilter, $event)"
            >
            </IonCheckbox>
            <IonLabel>{{ subcategoryFilter.subcategory }}</IonLabel>
          </IonItem>
        </IonList>
      </IonAccordion>
    </IonAccordionGroup>
  </IonList>
</template>
