<script setup lang="ts">
import AppToolbar from '@/components/AppToolbar.vue'
import InputWithErrorLabel from '@/components/InputWithErrorLabel.vue'
import { ActivityCategory, CreateActivityPayload } from '@/models/activity'
import ActivityService from '@/services/ActivityService'
import ErrorService from '@/services/ErrorService'
import { useActivitiesStore } from '@/store/activities'
import { useAuthStore } from '@/store/auth'
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonDatetime,
  IonIcon,
  IonItem,
  IonLabel,
  IonModal,
  IonPage,
  IonSelect,
  IonSelectOption,
  useIonRouter,
} from '@ionic/vue'
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import { format, formatISO, parseISO } from 'date-fns'
import { calendarOutline } from 'ionicons/icons'
import { storeToRefs } from 'pinia'
import { computed, ref } from 'vue'
import SelectWithErrorLabel from '@/components/SelectWithErrorLabel.vue'

const activitiesStore = useActivitiesStore()
const authStore = useAuthStore()
const router = useIonRouter()

const { activityCategories } = storeToRefs(activitiesStore)

const title = ref<string>('')
const description = ref<string>('')
const dateTimeRef = ref()
const dateTime = ref<string>(formatISO(new Date()))
const activityCategory = ref<ActivityCategory>()
const activitySubcategory = ref<string>('')

const validations = {
  title: {
    required,
  },
  description: {
    required,
  },
  dateTime: {
    required,
  },
  activityCategory: {
    required,
  },
  activitySubcategory: {
    required,
  },
}

const v$ = useVuelidate(
  validations,
  { title, description, dateTime, activityCategory, activitySubcategory },
  { $autoDirty: true }
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
      title: title.value,
      description: description.value,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      activityCategory: activityCategory.value!.name(),
      activitySubcategory: activitySubcategory.value,
      dateTime: parseISO(dateTime.value),
    }
    await ActivityService.createActivity(payload)
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    await ActivityService.getUsersActivities(authStore.user!)
    router.push({ name: 'AppActivities' })
  } catch (e) {
    ErrorService.handleError(e)
  } finally {
    title.value = ''
    description.value = ''
    dateTime.value = formatISO(new Date())
    activityCategory.value = undefined
    activitySubcategory.value = ''
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
      <form @submit.prevent="createActivity">
        <ion-item>
          <input-with-error-label
            :error="v$.title.$error"
            :error-message="$t('fieldRequired')"
            input-type="text"
            :placeholder="$t('title')"
            v-model="title"
          ></input-with-error-label>
        </ion-item>
        <ion-item>
          <input-with-error-label
            :error="v$.description.$error"
            :error-message="$t('fieldRequired')"
            input-type="text"
            :placeholder="$t('description')"
            v-model="description"
          ></input-with-error-label>
        </ion-item>
        <ion-item>
          <select-with-error-label
            :label="$t('activityCategory')"
            :ok-text="$t('ok')"
            :cancel-text="$t('cancel')"
            :options="activityCategories"
            :option-display-function="
              (activityCategory: ActivityCategory) => {
                return activityCategory.name()
              }
            "
            v-model="activityCategory"
          ></select-with-error-label>

          <!-- <ion-label>{{ $t('activityCategory') }}</ion-label>
          <ion-select :ok-text="$t('ok')" :cancel-text="$t('cancel')" v-model="activityCategory">
            <ion-select-option
              v-for="activityCategory in activityCategories"
              :key="activityCategory"
              :value="activityCategory"
              >{{ activityCategory.name() }}
            </ion-select-option>
          </ion-select> -->
        </ion-item>
        <ion-item v-if="activityCategory">
          <ion-label>{{ $t('activitySubcategory') }}</ion-label>
          <ion-select :ok-text="$t('ok')" :cancel-text="$t('cancel')" v-model="activitySubcategory">
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
                  <ion-button color="primary" @click="acceptDate">{{ $t('ok') }} </ion-button>
                </ion-buttons>
              </ion-datetime>
            </ion-content>
          </ion-modal>
        </ion-item>
        <ion-button type="submit" expand="block" :disabled="v$.$invalid"
          >{{ $t('submit') }}
        </ion-button>
      </form>
    </ion-content>
  </ion-page>
</template>
