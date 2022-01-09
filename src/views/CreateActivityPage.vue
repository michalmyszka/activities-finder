<template>
  <ion-page>
    <app-toolbar>
      <template #title>{{ $t('createActivity') }}</template>
      <template #start-buttons>
        <ion-back-button defaultHref="/app/activities"></ion-back-button>
      </template>
    </app-toolbar>
    <ion-content>
      <ion-input :placeholder="$t('title')" v-model="title"></ion-input>
      <ion-textarea
        :placeholder="$t('description')"
        v-model="description"
      ></ion-textarea>
      <ion-button id="datetime-select">{{ datetime }}</ion-button>
      <ion-modal trigger="datetime-select">
        <ion-content>
          <ion-datetime v-model="datetime"></ion-datetime>
        </ion-content>
      </ion-modal>
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
      <ion-button
        type="submit"
        expand="block"
        @click="createActivity"
        :disabled="formHasErrors"
        >{{ $t('submit') }}</ion-button
      >
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonBackButton,
  IonButton,
  IonContent,
  IonDatetime,
  IonInput,
  IonItem,
  IonLabel,
  IonModal,
  IonPage,
  IonSelect,
  IonSelectOption,
  IonTextarea,
  useIonRouter,
} from '@ionic/vue'
import AppToolbar from '@/components/AppToolbar.vue'
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import { ActivityCategory, ActivitySubcategory } from '@/models'
import { CreateActivityPayload } from '@/models/models'
import ActivityService from '@/services/ActivityService'

const store = useStore()
const router = useIonRouter()

const title = ref<string>('')
const description = ref<string>('')
const datetime = ref()
const activityCategory = ref<ActivityCategory>(
  ActivityService.mostRecentlyUsedCategory()
)
const activitySubcategory = ref<ActivitySubcategory>(
  ActivityService.mostRecentlyUsedSubcategory()
)

const formHasErrors = computed(
  () =>
    !ActivityService.isTitleValid(title.value) ||
    !ActivityService.isDescriptionValid(description.value) ||
    !activityCategory.value ||
    !activitySubcategory.value
)

function createActivity() {
  if (!formHasErrors.value) {
    let payload: CreateActivityPayload = {
      title: title.value,
      description: title.value,
      activityCategory: activityCategory.value,
      activitySubcategory: activitySubcategory.value,
    }
    store.dispatch('activities/createActivity', payload)
    store.dispatch('activities/getAllActivities')
    router.back()
  }
}
</script>
