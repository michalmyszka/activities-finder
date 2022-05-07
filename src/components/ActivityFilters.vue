<script setup lang="ts">
import { IonButton, IonGrid, IonIcon, IonRow } from '@ionic/vue'
import { filterCircleOutline, funnelOutline, mapOutline, pinOutline } from 'ionicons/icons'
</script>

<template>
  <IonGrid>
    <IonRow class="ion-justify-content-around">
      <IonButton>
        <IonIcon slot="icon-only" :icon="pinOutline"></IonIcon>
      </IonButton>
      <IonButton>
        <IonIcon slot="icon-only" :icon="filterCircleOutline"></IonIcon>
      </IonButton>
      <IonButton>
        <IonIcon slot="icon-only" :icon="funnelOutline"></IonIcon>
      </IonButton>
      <IonButton>
        <IonIcon slot="icon-only" :icon="mapOutline"></IonIcon>
      </IonButton>
    </IonRow>
  </IonGrid>
</template>
