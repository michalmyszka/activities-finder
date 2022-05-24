<script setup lang="ts">
import { useFiltersStore } from '@/store/filters'
import { IonInput, IonItem, IonLabel, IonList, IonListHeader, IonButton } from '@ionic/vue'
import { storeToRefs } from 'pinia'

const filtersStore = useFiltersStore()

const { placeFilters } = storeToRefs(filtersStore)

function clear() {
  placeFilters.value = ''
}
</script>

<template>
  <IonList>
    <IonListHeader>
      <IonLabel>{{ $t('place') }}</IonLabel>
      <IonButton @click="clear">{{ $t('clear') }}</IonButton>
    </IonListHeader>
    <IonItem>
      <IonInput type="text" :placeholder="$t('villageTownCity')" v-model="placeFilters"></IonInput>
    </IonItem>
  </IonList>
</template>
