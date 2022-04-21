<template>
  <!-- This style is here as StatusBar.setOverlaysWebView({ overlay: false }) is currently not supported on iOS. -->
  <IonToolbar style="margin-top: 20px">
    <IonTitle>
      <slot name="title">{{ $t('appTitle') }}</slot>
    </IonTitle>
    <IonButtons slot="start">
      <slot name="start-buttons"></slot>
    </IonButtons>
    <IonButtons slot="end">
      <slot name="end-buttons"></slot>
    </IonButtons>
  </IonToolbar>
</template>

<script setup lang="ts">
import { IonButtons, IonTitle, IonToolbar } from '@ionic/vue'
</script>
