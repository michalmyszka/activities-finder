<script setup lang="ts">
import { SubcategoryFilter } from '@/models/filter'
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
  subcategoryFilter.selected = selected
}

function clear() {
  categoryFilters.value.forEach((categoryFilter) => categoryFilter.deselectAll())
}
</script>

<template>
  <IonList>
    <IonListHeader>
      <IonLabel>{{ $t('activityCategory') }}</IonLabel>
      <IonButton @click="clear">{{ $t('clear') }}</IonButton>
    </IonListHeader>
    <IonAccordionGroup>
      <IonAccordion v-for="categoryFilter in categoryFilters" :key="categoryFilter.category">
        <IonItem slot="header">
          <IonLabel>{{ categoryFilter.category }}</IonLabel>
          <IonBadge v-if="categoryFilter.getSelectedSubcategories().length > 0">{{
            categoryFilter.getSelectedSubcategories().length
          }}</IonBadge>
        </IonItem>
        <IonList slot="content">
          <IonItem
            v-for="subcategoryFilter in categoryFilter.subcategories"
            :key="subcategoryFilter.subcategory"
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
