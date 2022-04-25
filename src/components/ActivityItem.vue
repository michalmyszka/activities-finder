<script setup lang="ts">
import { Activity } from '@/models/activity'
import { IonItem, IonLabel, IonText } from '@ionic/vue'
import { defineProps } from 'vue'

defineProps({
  activity: { type: Activity, required: true },
})
</script>

<template>
  <IonItem>
    <IonLabel>
      <IonText>
        <h1>{{ activity.title() }}</h1>
        <h2>{{ activity.category() }} - {{ activity.subcategory() }}</h2>
        <h2>{{ activity.dateTime() }}</h2>
      </IonText>
    </IonLabel>
  </IonItem>
</template>
