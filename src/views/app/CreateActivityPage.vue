<script setup lang="ts">
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonDatetime,
  IonIcon,
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
import { calendarOutline, timeOutline } from 'ionicons/icons'
import AppToolbar from '@/components/AppToolbar.vue'
import { computed, ref } from 'vue'
import { ActivityCategory, CreateActivityPayload } from '@/models/activity'
import ActivityService from '@/services/ActivityService'
import {
  format,
  formatISO,
  isFuture as isDateAndTimeInFuture,
  parseISO,
} from 'date-fns'
import ErrorService from '@/services/ErrorService'
import { useActivitiesStore } from '@/store/activities'

const activitiesStore = useActivitiesStore()
const router = useIonRouter()

const activityCategories = computed(
  () => activitiesStore.$state.activityCategories as ActivityCategory[]
)

const title = ref<string>('')
const description = ref<string>('')
const dateRef = ref()
const date = ref<string>(formatISO(new Date()))
const timeRef = ref()
const time = ref<string>(formatISO(new Date()))
const activityCategory = ref<ActivityCategory>()
const activitySubcategoryName = ref<string>('')

const userInputCorrect = computed(
  () =>
    ActivityService.isTitleValid(title.value) &&
    ActivityService.isDescriptionValid(description.value) &&
    activityCategory.value &&
    activitySubcategoryName.value &&
    isDateAndTimeInFuture(dateAndTime())
)

function dateAndTime() {
  return parseISO(
    format(parseISO(date.value), "yyyy-MM-dd'T'") +
      format(parseISO(time.value), 'HH:mm:00XXX')
  )
}

const formattedDate = computed(() => {
  if (date.value) {
    return format(parseISO(date.value), 'dd-MM-yyyy')
  } else {
    return ''
  }
})

const formattedTime = computed(() => {
  if (date.value) {
    return format(parseISO(time.value), 'HH:mm')
  } else {
    return ''
  }
})

function acceptDate() {
  dateRef.value.$el.confirm(true)
}

function acceptTime() {
  timeRef.value.$el.confirm(true)
}

function createActivity() {
  try {
    if (userInputCorrect.value) {
      let payload: CreateActivityPayload = {
        title: title.value,
        description: description.value,
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        activityCategory: activityCategory.value!.name(),
        activitySubcategory: activitySubcategoryName.value,
        date: format(parseISO(date.value), 'yyyy-MM-dd'),
        time: format(parseISO(time.value), 'HH:mm'),
      }
      ActivityService.createActivity(payload)
      ActivityService.getAllActivities()
      router.back()
    }
  } catch (e) {
    ErrorService.handleError(e)
  }
}
</script>

<template>
  <ion-page>
    <app-toolbar>
      <template #title>{{ $t('createActivity') }}</template>
      <template #start-buttons>
        <ion-back-button></ion-back-button>
      </template>
    </app-toolbar>
    <ion-content>
      <ion-item>
        <ion-input :placeholder="$t('title')" v-model="title"></ion-input>
      </ion-item>
      <ion-item>
        <ion-textarea
          :placeholder="$t('description')"
          v-model="description"
        ></ion-textarea>
      </ion-item>
      <ion-item>
        <ion-label>{{ $t('activityCategory') }}</ion-label>
        <ion-select
          :ok-text="$t('ok')"
          :cancel-text="$t('cancel')"
          v-model="activityCategory"
        >
          <ion-select-option
            v-for="activityCategory in activityCategories"
            :key="activityCategory"
            :value="activityCategory"
            >{{ activityCategory.name() }}</ion-select-option
          >
        </ion-select>
      </ion-item>
      <ion-item v-if="activityCategory">
        <ion-label>{{ $t('activitySubcategory') }}</ion-label>
        <ion-select
          :ok-text="$t('ok')"
          :cancel-text="$t('cancel')"
          v-model="activitySubcategoryName"
        >
          <ion-select-option
            v-for="activitySubcategory in activityCategory.subcategories()"
            :key="activitySubcategory"
            :value="activitySubcategory"
            >{{ activitySubcategory }}</ion-select-option
          >
        </ion-select>
      </ion-item>
      <ion-item>
        <ion-label>{{ $t('date') }}</ion-label>
        <ion-label>{{ formattedDate }}</ion-label>
        <ion-button id="date-select">
          <ion-icon slot="icon-only" :icon="calendarOutline"></ion-icon>
        </ion-button>
        <ion-modal trigger="date-select">
          <ion-content>
            <ion-datetime presentation="date" v-model="date" ref="dateRef">
              <ion-buttons slot="buttons">
                <ion-button color="primary" @click="acceptDate">{{
                  $t('ok')
                }}</ion-button>
              </ion-buttons>
            </ion-datetime>
          </ion-content>
        </ion-modal>
      </ion-item>
      <ion-item>
        <ion-label>{{ $t('time') }}</ion-label>
        <ion-label>{{ formattedTime }}</ion-label>
        <ion-button id="time-select">
          <ion-icon slot="icon-only" :icon="timeOutline"></ion-icon>
        </ion-button>
        <ion-modal trigger="time-select">
          <ion-content>
            <ion-datetime presentation="time" v-model="time" ref="timeRef">
              <ion-buttons slot="buttons">
                <ion-button color="primary" @click="acceptTime">{{
                  $t('ok')
                }}</ion-button>
              </ion-buttons>
            </ion-datetime>
          </ion-content>
        </ion-modal>
      </ion-item>
      <ion-button
        type="submit"
        expand="block"
        :disabled="!userInputCorrect"
        @click="createActivity"
        >{{ $t('submit') }}</ion-button
      >
    </ion-content>
  </ion-page>
</template>
