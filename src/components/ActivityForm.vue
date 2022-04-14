<script setup lang="ts">
import InputWithErrorLabel from '@/components/InputWithErrorLabel.vue'
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
  let payload: ActivityPayload = {
    title: title.value,
    description: description.value,
    activityCategory: (activityCategory.value as ActivityCategory).name(),
    activitySubcategory: activitySubcategory.value,
    dateTime: parseISO(dateTime.value),
  }
  emit('submit', payload)
}
</script>

<template>
  <form @submit.prevent="submit">
    <IonItem>
      <InputWithErrorLabel
        :error="v$.title.$error"
        :error-message="$t('fieldRequired')"
        input-type="text"
        :placeholder="$t('title')"
        v-model="title"
      ></InputWithErrorLabel>
    </IonItem>
    <IonItem>
      <InputWithErrorLabel
        :error="v$.description.$error"
        :error-message="$t('fieldRequired')"
        input-type="text"
        :placeholder="$t('description')"
        v-model="description"
      ></InputWithErrorLabel>
    </IonItem>
    <IonItem>
      <IonLabel>{{ $t('activityCategory') }}</IonLabel>
      <IonSelect :ok-text="$t('ok')" :cancel-text="$t('cancel')" v-model="activityCategory">
        <IonSelectOption
          v-for="activityCategory in activityCategories"
          :key="activityCategory"
          :value="activityCategory"
          >{{ activityCategory.name() }}
        </IonSelectOption>
      </IonSelect>
    </IonItem>
    <IonItem v-if="activityCategory">
      <IonLabel>{{ $t('activitySubcategory') }}</IonLabel>
      <IonSelect :ok-text="$t('ok')" :cancel-text="$t('cancel')" v-model="activitySubcategory">
        <IonSelectOption
          v-for="activitySubcategory in activityCategory.subcategories()"
          :key="activitySubcategory"
          :value="activitySubcategory"
          >{{ activitySubcategory }}
        </IonSelectOption>
      </IonSelect>
    </IonItem>
    <IonItem>
      <IonLabel>{{ $t('dateTime') }}</IonLabel>
      <IonLabel>{{ formattedDateTime }}</IonLabel>
      <IonButton id="date-time-select">
        <IonIcon slot="icon-only" :icon="calendarOutline"></IonIcon>
      </IonButton>
      <IonModal trigger="date-time-select">
        <IonContent>
          <IonDatetime v-model="dateTime" ref="dateTimeRef">
            <IonButtons slot="buttons">
              <IonButton color="primary" @click="acceptDate">{{ $t('ok') }} </IonButton>
            </IonButtons>
          </IonDatetime>
        </IonContent>
      </IonModal>
    </IonItem>
    <IonButton type="submit" expand="block" :disabled="v$.$invalid">{{ $t('submit') }} </IonButton>
  </form>
</template>
