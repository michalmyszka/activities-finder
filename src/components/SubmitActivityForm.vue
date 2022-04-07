<script setup lang="ts">
import InputWithErrorLabel from '@/components/InputWithErrorLabel.vue'
import { ActivityCategory, SubmitActivityPayload } from '@/models/activity'
import { useActivitiesStore } from '@/store/activities'
import { futureDateTimeValidator } from '@/utils'
import {
  IonButton,
  IonButtons,
  IonContent,
  IonDatetime,
  IonIcon,
  IonItem,
  IonLabel,
  IonModal,
  IonSelect,
  IonSelectOption,
} from '@ionic/vue'
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import { format, formatISO, parseISO } from 'date-fns'
import { calendarOutline } from 'ionicons/icons'
import { storeToRefs } from 'pinia'
import { computed, defineEmits, ref } from 'vue'

const emit = defineEmits<{
  (e: 'submit', payload: SubmitActivityPayload): void
}>()

const activitiesStore = useActivitiesStore()

const { activityCategories } = storeToRefs(activitiesStore)

const title = ref<string>('')
const description = ref<string>('')
const activityCategory = ref<ActivityCategory>()
const activitySubcategory = ref<string>('')
const dateTimeRef = ref()
const dateTime = ref<string>(formatISO(new Date()))

const validations = {
  title: {
    required,
  },
  description: {
    required,
  },
  activityCategory: {
    required,
  },
  activitySubcategory: {
    required,
  },
  dateTime: {
    required,
    futureDateTimeValidator,
  },
}

const v$ = useVuelidate(
  validations,
  { title, description, activityCategory, activitySubcategory, dateTime },
  { $autoDirty: true }
)

const formattedDateTime = computed(() => {
  return format(parseISO(dateTime.value), 'dd-MM-yyyy HH:mm')
})

function acceptDate() {
  dateTimeRef.value.$el.confirm(true)
}

function submit() {
  let payload: SubmitActivityPayload = {
    title: title.value,
    description: description.value,
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    activityCategory: activityCategory.value!.name(),
    activitySubcategory: activitySubcategory.value,
    dateTime: parseISO(dateTime.value),
  }
  emit('submit', payload)
}
</script>

<template>
  <form @submit.prevent="submit">
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
      <ion-label>{{ $t('activityCategory') }}</ion-label>
      <ion-select :ok-text="$t('ok')" :cancel-text="$t('cancel')" v-model="activityCategory">
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
</template>
