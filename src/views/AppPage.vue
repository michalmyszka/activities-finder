<template>
  <Authenticator>
    <template v-slot="{ user, signOut }">
      <ion-page>
        <ion-toolbar>
          <ion-chip slot="end">
            <ion-label>{{
              user.signInUserSession.idToken.payload.given_name +
              ' ' +
              user.signInUserSession.idToken.payload.family_name
            }}</ion-label>
          </ion-chip>
          <ion-buttons slot="end">
            <ion-button @click="signOut">
              <ion-icon slot="icon-only" :icon="logOut"></ion-icon>
            </ion-button>
          </ion-buttons>
          <ion-title>{{ $t('appTitle') }}</ion-title>
        </ion-toolbar>
        <ion-tabs>
          <ion-router-outlet></ion-router-outlet>
          <ion-tab-bar slot="bottom">
            <ion-tab-button tab="settings" href="/app/settings">
              <ion-icon :icon="settings" />
              <ion-label>Settings</ion-label>
            </ion-tab-button>
          </ion-tab-bar>
        </ion-tabs>
      </ion-page>
    </template>
  </Authenticator>
</template>

<script lang="ts">
import { Authenticator } from '@aws-amplify/ui-vue'
import {
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonLabel,
  IonIcon,
  IonPage,
  IonRouterOutlet,
  IonChip,
  IonButton,
  IonButtons,
  IonTitle,
  IonToolbar,
} from '@ionic/vue'
import { logOut, settings } from 'ionicons/icons'

export default {
  name: 'AppPage',

  components: {
    Authenticator,
    IonLabel,
    IonTabs,
    IonTabBar,
    IonTabButton,
    IonIcon,
    IonPage,
    IonRouterOutlet,
    IonChip,
    IonButton,
    IonButtons,
    IonTitle,
    IonToolbar,
  },

  setup() {
    return {
      logOut,
      settings,
    }
  },
}
</script>
