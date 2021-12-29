<template>
  <ion-page>
    <app-toolbar></app-toolbar>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="competitions" href="/app/competitions">
          <ion-icon :icon="medal" />
          <ion-label>{{ $t('competitions') }}</ion-label>
        </ion-tab-button>
        <ion-tab-button tab="settings" href="/app/settings">
          <ion-icon :icon="settings" />
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
import { medal, settings } from 'ionicons/icons'
import AppToolbar from '@/components/AppToolbar.vue'
</script>
