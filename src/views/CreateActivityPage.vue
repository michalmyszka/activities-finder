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
        <ion-label>{{ $t('activityCategory') }}</ion-label>
        <ion-select
          :ok-text="$t('ok')"
          :cancel-text="$t('cancel')"
          v-model="activityCategory"
        >
          <ion-select-option
            v-for="activityCategory in ActivityCategory"
            :key="activityCategory"
            :value="activityCategory"
          >
            {{ activityCategory }}
          </ion-select-option>
        </ion-select>
      </ion-item>
      <ion-item>
        <ion-label>{{ $t('activitySubcategory') }}</ion-label>
        <ion-select
          :ok-text="$t('ok')"
          :cancel-text="$t('cancel')"
          v-model="activitySubcategory"
        >
          <ion-select-option
            v-for="activitySubcategory in ActivitySubcategory"
            :key="activitySubcategory"
            :value="activitySubcategory"
          >
            {{ activitySubcategory }}
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
import { ref } from 'vue'
import { useStore } from 'vuex'
import { ActivityCategory, ActivitySubcategory } from '@/models'
import { CreateActivityPayload } from '@/models/models'

const store = useStore()
const router = useIonRouter()

const activityCategory = ref<ActivityCategory>()
const activitySubcategory = ref<ActivitySubcategory>()

function createActivity() {
  let payload: CreateActivityPayload = {
    activityCategory: activityCategory.value!,
    activitySubcategory: activitySubcategory.value!,
  }
  store.dispatch('activities/createActivity', payload)
  store.dispatch('activities/getAllActivities')
  router.back()
}
</script>
