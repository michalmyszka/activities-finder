<script setup lang="ts">
import AppToolbar from '@/components/AppToolbar.vue'
import AuthService from '@/services/AuthService'
import ErrorService from '@/services/ErrorService'
import {
  IonButton,
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  useIonRouter,
} from '@ionic/vue'
import { personCircleOutline } from 'ionicons/icons'

const router = useIonRouter()

function showProfilePage() {
  router.push({ name: 'Profile' })
}

async function signOut() {
  try {
    await AuthService.logOut()
    router.push({ name: 'Login' })
  } catch (error) {
    ErrorService.handleError(error)
  }
}
</script>

<template>
  <ion-page>
    <AppToolbar>
      <template #title>{{ $t('settings') }}</template>
    </AppToolbar>
    <IonContent>
      <IonList>
        <IonItem button lines="none" shape="round" @click="showProfilePage">
          <IonIcon slot="start" :icon="personCircleOutline"></IonIcon>
          <IonLabel>
            <h2>{{ $t('profile') }}</h2>
            <h3>{{ $t('emailPasswordEtc') }}</h3>
          </IonLabel>
        </IonItem>
      </IonList>
      <IonButton expand="block" color="danger" @click="signOut">{{ $t('logOut') }}</IonButton>
    </IonContent>
  </ion-page>
</template>
