<template>
  <ion-page>
    <app-toolbar>
      <template #start-buttons>
        <ion-back-button defaultHref="/app/activities"></ion-back-button>
      </template>
    </app-toolbar>
    <ion-content> Create activity form here </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonBackButton, IonContent, IonPage } from '@ionic/vue'
import AppToolbar from '@/components/AppToolbar.vue'
</script>
