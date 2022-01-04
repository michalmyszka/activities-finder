<template>
  <ion-toolbar>
    <ion-title>{{ $t('appTitle') }}</ion-title>
    <ion-buttons slot="start">
      <slot name="start-buttons"></slot>
    </ion-buttons>
    <ion-buttons slot="end">
      <slot name="end-buttons"></slot>
    </ion-buttons>
  </ion-toolbar>
</template>

<script setup lang="ts">
import { IonButtons, IonTitle, IonToolbar } from '@ionic/vue'
</script>
