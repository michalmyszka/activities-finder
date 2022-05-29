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
import {
  listCircleOutline,
  listOutline,
  peopleCircleOutline,
  settingsOutline,
} from 'ionicons/icons'
</script>

<template>
  <IonPage>
    <IonTabs>
      <IonRouterOutlet></IonRouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton tab="activities" href="/activities">
          <IonIcon :icon="listOutline" />
          <IonLabel>{{ $t('activities') }}</IonLabel>
        </IonTabButton>
        <IonTabButton tab="my-activities" href="/my-activities">
          <IonIcon :icon="listCircleOutline" />
          <IonLabel>{{ $t('myActivities') }}</IonLabel>
        </IonTabButton>
        <IonTabButton tab="connections" href="/connections">
          <IonIcon :icon="peopleCircleOutline" />
          <IonLabel>{{ $t('connections') }}</IonLabel>
        </IonTabButton>
        <IonTabButton tab="settings" href="/settings">
          <IonIcon :icon="settingsOutline" />
          <IonLabel>{{ $t('settings') }}</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  </IonPage>
</template>
