<template>
  <Authenticator>
    <template v-slot="{ user, signOut }">
      <ion-toolbar>
        <ion-title>{{ $t('appTitle') }}</ion-title>
        <ion-buttons slot="end">
          <ion-chip>
            <ion-icon :icon="person"></ion-icon>
            <ion-label>{{
              user.signInUserSession.idToken.payload.given_name +
              ' ' +
              user.signInUserSession.idToken.payload.family_name
            }}</ion-label>
          </ion-chip>
          <ion-button @click="signOut">
            <ion-icon slot="icon-only" :icon="logOut"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </template>
  </Authenticator>
</template>

<script setup lang="ts">
import {
  IonToolbar,
  IonTitle,
  IonButtons,
  IonChip,
  IonIcon,
  IonLabel,
  IonButton,
} from '@ionic/vue'
import { Authenticator } from '@aws-amplify/ui-vue'
import { person, logOut } from 'ionicons/icons'
</script>
