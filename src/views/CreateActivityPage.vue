<template>
  <ion-page>
    <app-toolbar>
      <template #title>{{ $t('createActivity') }}</template>
      <template #start-buttons>
        <ion-back-button defaultHref="/app/activities"></ion-back-button>
      </template>
    </app-toolbar>
    <ion-content>
      <ion-item>
        <ion-label>{{ $t('activityType') }}</ion-label>
        <ion-select
          :ok-text="$t('ok')"
          :cancel-text="$t('cancel')"
          v-model="activityType"
        >
          <ion-select-option
            v-for="activityType in ActivityType"
            :key="activityType"
            :value="activityType"
          >
            {{ activityType }}
          </ion-select-option>
        </ion-select>
      </ion-item>
      <ion-button type="submit" expand="block" @click="createActivity">{{
        $t('submit')
      }}</ion-button>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonBackButton,
  IonButton,
  IonContent,
  IonItem,
  IonLabel,
  IonPage,
  IonSelect,
  IonSelectOption,
  useIonRouter,
} from '@ionic/vue'
import AppToolbar from '@/components/AppToolbar.vue'
import { ActivityType } from '@/models'
import { ref } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const router = useIonRouter()

const activityType = ref<ActivityType>()

function createActivity() {
  store.dispatch('activities/createActivity', {
    activityType: activityType.value,
  })
  router.back()
}
</script>
