<script setup lang="ts">
import {
  IonIcon,
  IonLabel,
  IonPage,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from '@ionic/vue'
import { peopleCircleOutline, personCircleOutline, settingsOutline } from 'ionicons/icons'
</script>

<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="activities" href="/activities">
          <ion-icon :icon="peopleCircleOutline" />
          <ion-label>{{ $t('activities') }}</ion-label>
        </ion-tab-button>
        <ion-tab-button tab="users-activities" href="/users-activities">
          <ion-icon :icon="personCircleOutline" />
          <ion-label>{{ $t('myActivities') }}</ion-label>
        </ion-tab-button>
        <ion-tab-button tab="settings" href="/settings">
          <ion-icon :icon="settingsOutline" />
          <ion-label>{{ $t('settings') }}</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>
