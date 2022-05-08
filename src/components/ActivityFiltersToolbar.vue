<script setup lang="ts">
import { IonButton, IonButtons, IonIcon, IonToolbar } from '@ionic/vue'
import { filterCircleOutline, funnelOutline, mapOutline, pinOutline } from 'ionicons/icons'
</script>

<template>
  <IonToolbar>
    <IonButtons slot="start">
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
    </IonButtons>
  </IonToolbar>
</template>
