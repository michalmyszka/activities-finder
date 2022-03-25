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
import { calendarOutline } from 'ionicons/icons'
import AppToolbar from '@/components/AppToolbar.vue'
import { computed, ref } from 'vue'
import { ActivityCategory, CreateActivityPayload } from '@/models/activity'
import ActivityService from '@/services/ActivityService'
import { format, formatISO, isFuture, parseISO } from 'date-fns'
import ErrorService from '@/services/ErrorService'
import { useActivitiesStore } from '@/store/activities'
import { useAuthStore } from '@/store/auth'
import { storeToRefs } from 'pinia'

const activitiesStore = useActivitiesStore()
const authStore = useAuthStore()
const router = useIonRouter()

const { activityCategories } = storeToRefs(activitiesStore)

const title = ref<string>('')
const description = ref<string>('')
const dateTimeRef = ref()
const dateTime = ref<string>(formatISO(new Date()))
const activityCategory = ref<ActivityCategory>()
const activitySubcategoryName = ref<string>('')

const userInputCorrect = computed(
  () =>
    ActivityService.isTitleValid(title.value) &&
    ActivityService.isDescriptionValid(description.value) &&
    activityCategory.value &&
    activitySubcategoryName.value &&
    isFuture(parseISO(dateTime.value))
)

const formattedDateTime = computed(() => {
  return format(parseISO(dateTime.value), 'dd-MM-yyyy HH:mm')
})

function acceptDate() {
  dateTimeRef.value.$el.confirm(true)
}

async function createActivity() {
  try {
    let payload: CreateActivityPayload = {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      user: authStore.user!,
      title: title.value,
      description: description.value,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      activityCategory: activityCategory.value!.name(),
      activitySubcategory: activitySubcategoryName.value,
      dateTime: parseISO(dateTime.value),
    }
    await ActivityService.createActivity(payload)
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    await ActivityService.getUsersActivities(authStore.user!)
    router.push({ name: 'AppActivities' })
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
            >{{ activityCategory.name() }}
          </ion-select-option>
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
            >{{ activitySubcategory }}
          </ion-select-option>
        </ion-select>
      </ion-item>
      <ion-item>
        <ion-label>{{ $t('dateTime') }}</ion-label>
        <ion-label>{{ formattedDateTime }}</ion-label>
        <ion-button id="date-time-select">
          <ion-icon slot="icon-only" :icon="calendarOutline"></ion-icon>
        </ion-button>
        <ion-modal trigger="date-time-select">
          <ion-content>
            <ion-datetime v-model="dateTime" ref="dateTimeRef">
              <ion-buttons slot="buttons">
                <ion-button color="primary" @click="acceptDate"
                  >{{ $t('ok') }}
                </ion-button>
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
        >{{ $t('submit') }}
      </ion-button>
    </ion-content>
  </ion-page>
</template>
