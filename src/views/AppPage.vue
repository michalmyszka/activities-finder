<template>
  <ion-page>
    <app-toolbar></app-toolbar>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="competitions" href="/app/activities">
          <ion-icon :icon="happyOutline" />
          <ion-label>{{ $t('activities') }}</ion-label>
        </ion-tab-button>
        <ion-tab-button tab="settings" href="/app/settings">
          <ion-icon :icon="settingsOutline" />
          <ion-label>{{ $t('settings') }}</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage,
  IonTabs,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
} from '@ionic/vue'
import { happyOutline, settingsOutline } from 'ionicons/icons'
import AppToolbar from '@/components/AppToolbar.vue'
</script>
