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
  <IonPage>
    <IonTabs>
      <IonRouterOutlet></IonRouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton tab="activities" href="/activities">
          <IonIcon :icon="peopleCircleOutline" />
          <IonLabel>{{ $t('activities') }}</IonLabel>
        </IonTabButton>
        <IonTabButton tab="users-activities" href="/users-activities">
          <IonIcon :icon="personCircleOutline" />
          <IonLabel>{{ $t('myActivities') }}</IonLabel>
        </IonTabButton>
        <IonTabButton tab="settings" href="/settings">
          <IonIcon :icon="settingsOutline" />
          <IonLabel>{{ $t('settings') }}</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  </IonPage>
</template>
