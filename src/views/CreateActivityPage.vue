<template>
  <ion-page>
    <app-toolbar>
      <template #start-buttons>
        <ion-back-button defaultHref="/app/activities"></ion-back-button>
      </template>
    </app-toolbar>
    <ion-content>
      <ion-item>
        <ion-label>{{ $t('activityType') }}</ion-label>
        <ion-select
          value="brown"
          :ok-text="$t('ok')"
          :cancel-text="$t('cancel')"
        >
          <ion-select-option
            v-for="activityType in ActivityType"
            :key="activityType"
            :value="activityType"
            >{{ activityType }}</ion-select-option
          >
        </ion-select>
      </ion-item>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonBackButton,
  IonContent,
  IonItem,
  IonLabel,
  IonPage,
  IonSelect,
  IonSelectOption,
} from '@ionic/vue'
import AppToolbar from '@/components/AppToolbar.vue'
</script>
