<script setup lang="ts">
import InputWithErrorLabel from '@/components/InputWithErrorLabel.vue'
import TextAreaWithErrorLabel from '@/components/TextAreaWithErrorLabel.vue'
import { ActivityCategory, ActivityPayload } from '@/models/activity'
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
import { computed, defineEmits, defineProps, ref } from 'vue'

const props = defineProps({
  title: { type: String, default: '' },
  description: { type: String, default: '' },
  activityCategory: { type: ActivityCategory },
  activitySubcategory: { type: String, default: '' },
  place: { type: String, default: '' },
  address: { type: String, default: '' },
  dateTime: { type: String, default: formatISO(new Date()) },
})

const emit = defineEmits<{
  (e: 'submit', payload: ActivityPayload): void
}>()

const activitiesStore = useActivitiesStore()

const { activityCategories } = storeToRefs(activitiesStore)

const title = ref<string>(props.title)
const description = ref<string>(props.description)
const activityCategory = props.activityCategory
  ? ref<ActivityCategory>(props.activityCategory)
  : ref<ActivityCategory>()
const activitySubcategory = ref<string>(props.activitySubcategory)
const dateTimeRef = ref()
const place = ref<string>(props.place)
const address = ref<string>(props.address)
const dateTime = ref<string>(props.dateTime)

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
  place: {
    required,
  },
  address: {
    required,
  },
  dateTime: {
    required,
    futureDateTimeValidator,
  },
}

const v$ = useVuelidate(
  validations,
  { title, description, activityCategory, activitySubcategory, place, address, dateTime },
  { $autoDirty: true }
)

const formattedDateTime = computed(() => {
  return format(parseISO(dateTime.value), 'dd-MM-yyyy HH:mm')
})

function acceptDate() {
  dateTimeRef.value.$el.confirm(true)
}

function submit() {
  let payload: ActivityPayload = {
    title: title.value,
    description: description.value,
    activityCategory: (activityCategory.value as ActivityCategory).getName(),
    activitySubcategory: activitySubcategory.value,
    place: place.value,
    address: address.value,
    dateTime: parseISO(dateTime.value),
  }
  emit('submit', payload)
}
</script>

<template>
  <form @submit.prevent="submit">
    <IonItem>
      <IonLabel>{{ $t('title') }}</IonLabel>
      <InputWithErrorLabel
        :error="v$.title.$error"
        :error-message="$t('fieldRequired')"
        input-type="text"
        :placeholder="$t('titleExample')"
        v-model="title"
      ></InputWithErrorLabel>
    </IonItem>
    <IonItem>
      <IonLabel>{{ $t('activityCategory') }}</IonLabel>
      <IonSelect interface="popover" v-model="activityCategory">
        <IonSelectOption
          v-for="activityCategory in activityCategories"
          :key="activityCategory.getName()"
          :value="activityCategory"
          >{{ activityCategory.getName() }}
        </IonSelectOption>
      </IonSelect>
    </IonItem>
    <IonItem v-if="activityCategory">
      <IonLabel>{{ $t('activitySubcategory') }}</IonLabel>
      <IonSelect interface="popover" v-model="activitySubcategory">
        <IonSelectOption
          v-for="activitySubcategory in activityCategory.getSubcategories()"
          :key="activitySubcategory"
          >{{ activitySubcategory }}
        </IonSelectOption>
      </IonSelect>
    </IonItem>
    <IonItem>
      <IonLabel>{{ $t('place') }}</IonLabel>
      <InputWithErrorLabel
        :error="v$.place.$error"
        :error-message="$t('fieldRequired')"
        input-type="text"
        :placeholder="$t('placeExample')"
        v-model="place"
      ></InputWithErrorLabel>
    </IonItem>
    <IonItem>
      <IonLabel>{{ $t('address') }}</IonLabel>
      <InputWithErrorLabel
        :error="v$.address.$error"
        :error-message="$t('fieldRequired')"
        input-type="text"
        :placeholder="$t('addressExample')"
        v-model="address"
      ></InputWithErrorLabel>
    </IonItem>
    <IonItem>
      <IonLabel>{{ $t('dateTime') }}</IonLabel>
      <IonLabel>{{ formattedDateTime }}</IonLabel>
      <IonButton id="date-time-select">
        <IonIcon slot="icon-only" :icon="calendarOutline"></IonIcon>
      </IonButton>
      <IonModal trigger="date-time-select">
        <IonContent>
          <IonDatetime first-day-of-week="1" v-model="dateTime" ref="dateTimeRef">
            <IonButtons slot="buttons">
              <IonButton color="primary" @click="acceptDate">{{ $t('ok') }}</IonButton>
            </IonButtons>
          </IonDatetime>
        </IonContent>
      </IonModal>
    </IonItem>
    <IonItem>
      <IonLabel>{{ $t('description') }}</IonLabel>
      <TextAreaWithErrorLabel
        :error="v$.description.$error"
        :error-message="$t('fieldRequired')"
        :placeholder="$t('descriptionExample')"
        v-model="description"
      ></TextAreaWithErrorLabel>
    </IonItem>
    <IonButton type="submit" expand="block" :disabled="v$.$invalid">{{ $t('submit') }} </IonButton>
  </form>
</template>
