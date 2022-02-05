<template>
  <Authenticator>
    <template v-slot="">
      <ion-app>
        <ion-router-outlet />
      </ion-app>
    </template>
  </Authenticator>
</template>

<script setup lang="ts">
import { Authenticator } from '@aws-amplify/ui-vue'
import { IonApp, IonRouterOutlet } from '@ionic/vue'
import '@aws-amplify/ui-vue/styles.css'
import Amplify, { AuthModeStrategyType, Hub } from 'aws-amplify'
import awsconfig from './aws-exports'

Amplify.configure({
  ...awsconfig,
  DataStore: {
    authModeStrategyType: AuthModeStrategyType.MULTI_AUTH,
  },
})

Amplify.Logger.LOG_LEVEL = 'DEBUG'
Hub.listen('datastore', async (hubData) => {
  const { event, data } = hubData.payload
  console.log(event)
  console.log(data)
})
</script>
