<template>
  <ion-toolbar>
    <ion-title>
      <slot name="title">{{ $t('appTitle') }}</slot>
    </ion-title>
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
